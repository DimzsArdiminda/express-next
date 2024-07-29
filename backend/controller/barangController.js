import BarangController from "../model/BarangModel.js"

export const getBarang = async (req, res) =>{
    try {
        const resp = BarangController.findAll();
        res.status(200).json(resp);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error : error.message})
    }
}