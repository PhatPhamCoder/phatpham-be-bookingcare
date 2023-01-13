import clicnicService from "../services/clicnicService"

let createClinic = async (req, res) => {
    try {
        let data = await clicnicService.createClincic(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log('get all code error:', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let data = await clicnicService.getAllClinic();
        return res.status(200).json(data);
    } catch (e) {
        console.log('get all code error:', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clicnicService.getDetailClinicById(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the sever...'
        })
    }
}


module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}