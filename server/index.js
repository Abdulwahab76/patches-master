import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import multer from 'multer';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });
// Fallback to .env if .env.local doesn't exist or for other variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database file paths
const DB_FILE = path.join(__dirname, 'leads.json');
const CSV_FILE = path.join(__dirname, 'leads.csv');

// Ensure DB files exist
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, '[]', 'utf8');
}

if (!fs.existsSync(CSV_FILE)) {
    // Write CSV Header
    fs.writeFileSync(CSV_FILE, 'ID,FullName,Email,Phone,PatchType,Width,Height,DesignInspiration,Quantity,Details,CreatedAt,Status\n', 'utf8');
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Sanitize filename
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, Date.now() + '-' + safeName);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Configure Nodemailer Transporter
// NOTE: For Gmail, you usually need an App Password if 2FA is on.
// If not provided, we will log the email content to console.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with env var
        pass: process.env.EMAIL_PASS || 'your-app-password'     // Replace with env var
    }
});

const sendEmailNotification = async (lead, filePath) => {
    const adminEmail = 'abdulwahab12.pk@gmail.com';

    const mailOptions = {
        from: '"PatchMaster Pro Lead" <no-reply@patchmaster.pro>',
        to: adminEmail,
        subject: `New Quote Request: ${lead.fullName} (${lead.patchType})`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ea580c;">New Lead Received</h2>
                <p>A new quote request has been submitted.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr style="background-color: #f3f4f6;">
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Full Name</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${lead.fullName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${lead.email}</td>
                    </tr>
                    <tr style="background-color: #f3f4f6;">
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${lead.phone || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Patch Type</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${lead.patchType}</td>
                    </tr>
                    <tr style="background-color: #f3f4f6;">
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Dimensions</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${lead.width || '?'}in x ${lead.height || '?'}in</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Design Inspiration</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${lead.designInspiration || 'N/A'}</td>
                    </tr>
                    <tr style="background-color: #f3f4f6;">
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Quantity</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${lead.quantity}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Details</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${lead.details}</td>
                    </tr>
                </table>
                
                ${filePath ? '<p style="margin-top: 20px;"><strong>Attachment:</strong> A design file was uploaded with this request.</p>' : ''}

                <p style="margin-top: 20px; font-size: 12px; color: #666;">
                    This lead was captured on ${new Date(lead.createdAt).toLocaleString()}.
                </p>
            </div>
        `
    };

    try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            console.log('Email notification sent to', adminEmail);
        } else {
            console.log('Skipping email send (EMAIL_USER/PASS not set). Email Content Preview:');
            console.log(mailOptions.subject);
        }
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

const appendToCSV = (lead) => {
    // Escape fields to handle commas or newlines within data
    const escape = (field) => {
        if (!field) return '';
        const stringField = String(field);
        if (stringField.includes(',') || stringField.includes('\n') || stringField.includes('"')) {
            return `"${stringField.replace(/"/g, '""')}"`;
        }
        return stringField;
    };

    const row = [
        lead.id,
        escape(lead.fullName),
        escape(lead.email),
        escape(lead.phone),
        escape(lead.patchType),
        escape(lead.width),
        escape(lead.height),
        escape(lead.designInspiration),
        escape(lead.quantity),
        escape(lead.details),
        lead.createdAt,
        lead.status
    ].join(',') + '\n';

    fs.appendFileSync(CSV_FILE, row, 'utf8');
    console.log('Lead appended to CSV:', CSV_FILE);
};


// API Routes
// API Routes
app.post('/api/leads', upload.single('designFile'), async (req, res) => {
    try {
        const leadData = req.body;
        const file = req.file;

        // Basic validation
        if (!leadData.email || !leadData.fullName) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Add timestamp
        const newLead = {
            ...leadData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'new',
            designFile: file ? file.filename : null
        };

        // 1. JSON Logging
        const leads = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        leads.push(newLead);
        fs.writeFileSync(DB_FILE, JSON.stringify(leads, null, 2), 'utf8');

        // 2. Email Notification (Priority)
        await sendEmailNotification(newLead, file ? file.path : null);

        // 3. CSV Logging (Best Effort)
        try {
            appendToCSV(newLead);
        } catch (csvError) {
            console.error('Failed to append to CSV (file might be locked):', csvError.message);
        }

        res.status(201).json({ success: true, message: 'Lead submitted successfully' });
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
