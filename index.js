import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";


const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"vaibhavisharma.sv2527@gmail.com",
        pass:"ucyj cysr farw dcws"
    }
});

app.post("/contact", async (req,res) => {
    try{
        const {name, email, phone, eventType, specifyEvent, eventDate, guestCount, message } = req.body;

        const template = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Catering Enquiry</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
<tr>
<td align="center">

<table role="presentation" width="680" cellpadding="0" cellspacing="0" style="background:#ffffff;border:2px solid #D4AF37;border-radius:10px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td align="center" style="background:#D4AF37;padding:30px;">
            <h1 style="margin:0;font-family:Georgia,serif;color:#ffffff;font-size:32px;">
                🍽 New Catering Enquiry
            </h1>

            <p style="margin:10px 0 0;color:#fff;font-size:16px;">
                A customer has submitted a new catering request.
            </p>
        </td>
    </tr>

    <!-- Alert -->
    <tr>
        <td style="padding:35px 40px 20px;">

            <h2 style="margin:0;color:#333;font-family:Georgia,serif;">
                Action Required
            </h2>

            <p style="margin-top:15px;color:#555;font-size:16px;line-height:28px;">
                A new catering enquiry has been received through your website. Please review the customer's requirements and contact them as soon as possible to discuss availability, menu preferences, pricing, and any special arrangements.
            </p>

        </td>
    </tr>

    <!-- Customer Information -->
    <tr>
        <td style="padding:0 40px 30px;">

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #D4AF37;">

                <tr>
                    <td colspan="2" align="center" style="background:#D4AF37;color:#ffffff;padding:14px;font-size:20px;font-family:Georgia,serif;">
                        Customer Information
                    </td>
                </tr>

                <tr>
                    <td width="35%" style="padding:14px;background:#FBF8EE;font-weight:bold;border-bottom:1px solid #eee;">
                        Customer Name
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${name}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#FBF8EE;font-weight:bold;border-bottom:1px solid #eee;">
                        Email Address
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${email}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#FBF8EE;font-weight:bold;border-bottom:1px solid #eee;">
                        Phone Number
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${phone}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#FBF8EE;font-weight:bold;border-bottom:1px solid #eee;">
                        Event Type
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${eventType}
                        ${specifyEvent}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#FBF8EE;font-weight:bold;border-bottom:1px solid #eee;">
                        Event Date
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                       ${eventDate}
                    </td>
                </tr>



                <tr>
                    <td style="padding:14px;background:#FBF8EE;font-weight:bold;border-bottom:1px solid #eee;">
                        Number of Guests
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${guestCount}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#FBF8EE;font-weight:bold;vertical-align:top;">
                        Customer Message
                    </td>
                    <td style="padding:14px;">
                        ${message}
                    </td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- Summary -->
    <tr>
        <td style="padding:0 40px 30px;">

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF9E8;border-left:5px solid #D4AF37;">

                <tr>
                    <td style="padding:22px;">

                        <h3 style="margin:0;color:#B8860B;font-family:Georgia,serif;">
                            📋 Enquiry Summary
                        </h3>

                        <p style="margin:15px 0 0;color:#555;line-height:28px;font-size:15px;">
                            <strong>${name}</strong> has requested catering services for a
                            <strong>${eventType}</strong> scheduled on
                            <strong>${eventDate}</strong> requiring
                            <strong>${guestCount}</strong> guests.
                        </p>

                        <p style="margin:15px 0 0;color:#555;line-height:28px;font-size:15px;">
                            Please contact the customer using the phone number or email provided above to discuss menu options, pricing, venue details, and booking confirmation.
                        </p>

                    </td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td align="center" style="background:#D4AF37;padding:25px;">

            <p style="margin:0;color:#ffffff;font-size:18px;font-family:Georgia,serif;">
                Manik Catering Administration
            </p>

            <p style="margin:10px 0 0;color:#fff;font-size:14px;">
                This is an automated notification generated from your website contact form.
            </p>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>`

        const reassurance = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact Form Confirmation</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f4;padding:40px 0;">
<tr>
<td align="center">

<table role="presentation" width="650" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:10px;overflow:hidden;border:2px solid #d4af37;">

    <!-- Header -->
    <tr>
        <td align="center" style="background:#ffffff;padding:35px 20px;border-bottom:4px solid #d4af37;">
            <h1 style="margin:0;color:#b8860b;font-size:34px;font-family:Georgia,serif;">
                Manik Catering
            </h1>

            <p style="margin:10px 0 0;color:#555;font-size:16px;letter-spacing:1px;">
                Thank You for Contacting Us
            </p>
        </td>
    </tr>

    <!-- Greeting -->
    <tr>
        <td style="padding:35px 40px;">

            <h2 style="margin-top:0;color:#222;font-family:Georgia,serif;">
                Dear ${name},
            </h2>

            <p style="color:#555;font-size:16px;line-height:28px;">
                Thank you for reaching out to <strong style="color:#b8860b;">Manik Catering</strong>.
                We have successfully received your catering enquiry.
            </p>

            <p style="color:#555;font-size:16px;line-height:28px;">
                Our team will carefully review your request and get back to you shortly with the best catering options for your special occasion.
            </p>

        </td>
    </tr>

    <!-- Submitted Details -->
    <tr>
        <td style="padding:0 40px 30px;">

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e7c86d;">

                <tr>
                    <td colspan="2" style="background:#d4af37;color:#fff;padding:14px;font-size:20px;font-family:Georgia,serif;text-align:center;">
                        Your Submitted Details
                    </td>
                </tr>

                <tr>
                    <td width="35%" style="padding:14px;background:#faf8f1;font-weight:bold;border-bottom:1px solid #eee;">
                        Full Name
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${name}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#faf8f1;font-weight:bold;border-bottom:1px solid #eee;">
                        Email
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${email}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#faf8f1;font-weight:bold;border-bottom:1px solid #eee;">
                        Phone Number
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${phone}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#faf8f1;font-weight:bold;border-bottom:1px solid #eee;">
                        Event Type
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${eventType}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#faf8f1;font-weight:bold;border-bottom:1px solid #eee;">
                        Event Date
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${eventDate}
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#faf8f1;font-weight:bold;border-bottom:1px solid #eee;">
                        Guests
                    </td>
                    <td style="padding:14px;border-bottom:1px solid #eee;">
                        ${guestCount}
                    </td>
                </tr>


                <tr>
                    <td style="padding:14px;background:#faf8f1;font-weight:bold;vertical-align:top;">
                        Message
                    </td>
                    <td style="padding:14px;">
                        ${message}
                    </td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- Divider -->
    <tr>
        <td align="center">
            <table width="90%" cellspacing="0" cellpadding="0">
                <tr>
                    <td style="border-top:2px solid #d4af37;"></td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Message -->
    <tr>
        <td style="padding:35px 40px;">

            <p style="font-size:16px;color:#555;line-height:28px;margin-top:0;">
                We appreciate the opportunity to be part of your celebration. Our catering specialists will contact you soon to discuss your requirements and prepare a personalized quotation.
            </p>

            <table role="presentation" cellspacing="0" cellpadding="0" align="center" style="margin:25px auto;">
                <tr>
                    <td bgcolor="#d4af37" style="border-radius:5px;">
                        <a href="https://yourwebsite.com"
                           style="display:inline-block;padding:15px 35px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;">
                            Visit Our Website
                        </a>
                    </td>
                </tr>
            </table>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td align="center" style="background:#b8860b;padding:25px;color:#fff;">

            <h3 style="margin:0;font-family:Georgia,serif;">
                Manik Catering
            </h3>

            <p style="margin:10px 0;font-size:14px;">
                Crafting Memorable Celebrations with Exquisite Cuisine
            </p>

            <p style="margin:0;font-size:13px;">
                📞 +91 7876167162 &nbsp; | &nbsp;
                ✉ contact@Manikcatering.com
            </p>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>`

await transporter.sendMail(
    {
        to:"sharmadheeraj1976.ds@gmail.com",
        from:"vaibhavisharma.sv2527@gmail.com",
        subject:"Enquiry from customer",
        html:template
    }
)

await transporter.sendMail({
    to:`${email}`,
    from:"vaibhavisharma.sv2527@gmail.com",
    subject:"Enquiry received",
    html:reassurance
});

console.log("Email Sent!!");

res.status(200).json({message:"Task accomplished!!"});
        

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong!!"})

    }
});

app.listen(process.env.PORT, ()=> console.log(`http://localhost:${process.env.PORT}/`));
