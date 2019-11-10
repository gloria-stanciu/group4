const { House_Details, Houses, Materials, House_Parts } = require('../../../models')

async function get(req, res) {
    try {
        const rows = await House_Details.findAll({attributes: {exclude:['HousePartId', 'HouseId', 'MaterialId']}});
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function create(req, res) {
    const HousesId = req.body.HousesId;
    const HousePartsId = req.body.HousePartsId;
    const MaterialsId = req.body.MaterialsId;
    try {
        const detail = await House_Details.build({
            surface: req.body.surface,
            U_value: req.body.U_value,
            hjoht: req.body.hjoht,
        })

        detail.setHouses(HousesId)
        detail.setHouse_Parts(HousePartsId)
        detail.setMaterials(MaterialsId)
        await detail.save()

        return res.status(200).send(detail);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}

async function update(req, res) {
    try{
        const updated = await House_Details.update(req.body, {
            where: {id: req.params.id},
            fields: Object.keys(req.body)
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err);
    }
}

async function remove(req, res) {
    try {
        await House_Details.destroy({where: {id: req.params.id}});
        res.status(200).send(true);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    '/': {
        get: {
            action: get,
            level: 'public'
        },
        post: {
            action: create,
            level: 'public'
        }
    },
    '/:id': {
        put: {
            action: update,
            level: 'public'
        },
        delete: {
            action: remove,
            level: 'public'
        },
    },
}