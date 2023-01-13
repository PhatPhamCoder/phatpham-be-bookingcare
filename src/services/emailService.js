require('dotenv').config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"PhatPham 👻" <phamhoangminhphat.it@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh tại PhatPham Care", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'en') {
        result =
            `<h3>Dear ${dataSend.patientName}</h3>
            <p>We send you information to register your appointment at ......</p>
            <p>Clinic schedule information</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor Name: ${dataSend.doctorName}</b></div>

            <p>If the above information is correct, please click the following link to confirm</p>

            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>

            <div>Thanks!</div>
            `
    }

    if (dataSend.language === 'vi') {
        result =
            `<h3>Xin chào ${dataSend.patientName}</h3>
            <p>Chúng tôi gửi bạn thông tin đăng kí lịch khám của bạn tại ......</p>
            <p>Thông tin lịch khám</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

            <p> Nếu thông trên chính xác vui lòng nhấn vào link sau đây để xác nhận</p>

            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>

            <div>Xin chân thành cảm ơn!</div>
            `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({

                from: '"PhatPham 👻" <phamhoangminhphat.it@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), // html body
                attachments: [
                    {   // encoded string as an attachment
                        filename: `Receipt from ${dataSend.patientId} at ${new Date().getTime()}.png`,
                        content: dataSend.imageBase64.split('base64,')[1],
                        encoding: 'base64'
                    },
                ]
            });
            console.log('check infor send email')
            console.log(info)
            resolve()
        } catch (e) {
            reject(e)
        }

    })
    // create reusable transporter object using the default SMTP transport

}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'en') {
        result =
            `<h3>Dear ${dataSend.patientName}</h3>
            <p>We send you information to register your appointment at ......</p>
            <p>Clinic schedule information</p>

            <div>Thanks!</div>
           `
    }

    if (dataSend.language === 'vi') {
        result =
            `<h3>Xin chào ${dataSend.patientName}</h3>
            <p>Chúng tôi gửi bạn thông tin đăng kí lịch khám của bạn tại ......</p>
            <p>Thông tin đơn thuốc và hóa hóa đơn được gửi trong file đính kèm</p>

            <div>Xin chân thành cảm ơn!</div>
            `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    getBodyHTMLEmail: getBodyHTMLEmail,
    sendAttachment: sendAttachment,
    getBodyHTMLEmailRemedy: getBodyHTMLEmailRemedy
}