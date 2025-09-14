// SMS service using Twilio (free tier available)
export class SMSService {
  static async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      // For development/testing, we'll use a mock service
      // But also provide real Twilio integration option
      
      if (process.env.NODE_ENV === 'development' || !process.env.TWILIO_ACCOUNT_SID) {
        // Mock SMS for development
        console.log(`📱 [MOCK SMS] sent to ${phone}: ${message}`);
        console.log(`📱 [MOCK SMS] In production, this would be sent via Twilio`);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
      }

      // Real Twilio SMS (uncomment when you have Twilio credentials)
      /*
      const twilio = require('twilio');
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const result = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });

      console.log(`📱 SMS sent via Twilio to ${phone}: ${result.sid}`);
      return true;
      */
      
    } catch (error) {
      console.error('SMS sending failed:', error);
      return false;
    }
    
    return false;
  }
}

// Zalo service (in production, integrate with Zalo Official Account API)
export class ZaloService {
  static async sendZaloMessage(phone: string, message: string): Promise<boolean> {
    try {
      // For development/testing, we'll use a mock service
      // But also provide real Zalo integration option
      
      if (process.env.NODE_ENV === 'development' || !process.env.ZALO_ACCESS_TOKEN) {
        // Mock Zalo for development
        console.log(`💬 [MOCK ZALO] message sent to ${phone}: ${message}`);
        console.log(`💬 [MOCK ZALO] In production, this would be sent via Zalo Official Account API`);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
      }

      // Real Zalo API (uncomment when you have Zalo credentials)
      /*
      const response = await fetch('https://openapi.zalo.me/v2.0/oa/message', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${process.env.ZALO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          recipient: { user_id: phone },
          message: { text: message }
        })
      });

      if (!response.ok) {
        throw new Error(`Zalo API error: ${response.status}`);
      }

      const result = await response.json();
      console.log(`💬 Zalo message sent to ${phone}: ${result.message_id}`);
      return true;
      */
      
    } catch (error) {
      console.error('Zalo message sending failed:', error);
      return false;
    }
    
    return false;
  }
}

// Email service for OTP (using Gmail SMTP)
export class EmailService {
  static async sendOTPEmail(phone: string, otp: string): Promise<boolean> {
    try {
      // For development, we'll use a simple email service
      // You can use Gmail SMTP or any email service
      
      if (process.env.NODE_ENV === 'development' || !process.env.SMTP_USER) {
        // Mock email for development
        console.log(`📧 [MOCK EMAIL] OTP sent to ${phone}@pharmacy.com: ${otp}`);
        console.log(`📧 [MOCK EMAIL] In production, this would be sent via SMTP`);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
      }

      // Real email sending (uncomment when you have SMTP credentials)
      /*
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: `${phone}@pharmacy.com`,
        subject: 'Mã xác thực OTP - NhaThuocAI',
        text: `Mã xác thực của bạn là: ${otp}. Mã có hiệu lực trong 5 phút. Không chia sẻ mã này với ai.`
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Email sent to ${phone}@pharmacy.com`);
      return true;
      */
      
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
    
    return false;
  }
}

// Main OTP service
export class OTPService {
  static async sendOTP(phone: string, otp: string, method: 'sms' | 'zalo'): Promise<boolean> {
    const message = `Mã xác thực của bạn là: ${otp}. Mã có hiệu lực trong 5 phút. Không chia sẻ mã này với ai. - NhaThuocAI`;

    switch (method) {
      case 'sms':
        return await SMSService.sendSMS(phone, message);
      
      case 'zalo':
        return await ZaloService.sendZaloMessage(phone, message);
      
      default:
        throw new Error(`Unsupported OTP method: ${method}`);
    }
  }

  // Alternative method to send OTP via email
  static async sendOTPViaEmail(phone: string, otp: string): Promise<boolean> {
    return await EmailService.sendOTPEmail(phone, otp);
  }
}
