const {
    Users,
    Houses,
    House_Details,
    Locations,
    House_Parts,
    Materials,
    Heating_Systems,
    Thermal_Bridges,
} = require('../../models')

const jwt = require('jsonwebtoken')

async function getAllUsersHouses(req, res) {
    const token = jwt.decode(req.headers('x-access-token'))
    try {
        const houses = await Houses.findAll({
            where: { UsersId: token.id },
        })
        res.status(200).send(houses)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getHouseDetails(req, res) {
    try {
        const house = await Houses.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    as: 'Users',
                },
                {
                    model: Locations,
                    as: 'Locations',
                },
                {
                    model: Heating_Systems,
                    as: 'Heating_Systems',
                },
                {
                    model: House_Details,
                    as: 'House_Details',
                    include: [
                        {
                            model: House_Parts,
                            as: 'House_Parts',
                        },
                        {
                            model: Materials,
                            as: 'Materials',
                        },
                        {
                            model: Thermal_Bridges,
                            as: 'Thermal_Bridges',
                            attributes: {
                                exclude: ['HouseDetailId'],
                            },
                        },
                    ],
                    attributes: { exclude: ['HouseDetailsId'] },
                },
            ],
        })
        return res.status(200).send(house)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getHouseDetails,
    getAllUsersHouses,
}
