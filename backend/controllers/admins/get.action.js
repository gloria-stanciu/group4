require('module-alias/register')
const db = require('@models')
// const { Users } = require('@models')

// const models = [
//     {
//         name: 'Users',
//         path: 'users',
//         attributes: {
//             username: 'text',
//             password: 'password',
//             full_name: 'text',
//             email: 'email',
//             role: 'text',
//         },
//     },
//     {
//         name: 'Houses',
//         path: 'houses',
//         attributes: {
//             decade: 'number',
//             levels: 'number',
//             heating_per_year: 'double',
//             warm_water_pipe: 'boolean',
//             UsersId: 'number',
//             LocationsId: 'number',
//             HeatingSystemsId: 'number',
//         },
//     },
//     {
//         name: 'House Details',
//         path: 'house-details',
//         attributes: {
//             surface: 'double',
//             U_value: 'double',
//             hjoht: 'double',
//             HousesId: 'number',
//             HousePartsId: 'number',
//             MaterialsId: 'number',
//         },
//     },
//     {
//         name: 'House Parts',
//         path: 'house-parts',
//         attributes: {
//             part: 'text',
//         },
//     },
//     {
//         name: 'Heating Systems',
//         path: 'heating-systems',
//         attributes: {
//             type: 'text',
//         },
//     },
//     {
//         name: 'Locations',
//         path: 'locations',
//         attributes: {
//             country: 'text',
//         },
//     },
//     {
//         name: 'Thermal Bridges',
//         path: 'thermal-bridges',
//         attributes: {
//             bridge_length: 'double',
//             HouseDetailsId1: 'number',
//             HouseDetailsId2: 'number',
//         },
//     },
//     {
//         name: 'Materials',
//         path: 'materials',
//         attributes: {
//             name: 'text',
//             type: 'text',
//             description: 'text',
//         },
//     },
// ]

async function getModels(req, res) {
    try {
        let describeModel = []
        delete db['Sequelize']
        delete db['sequelize']

        const modelNames = Object.keys(db)
        for (const model of modelNames) {
            const d = await db[model].describe()
            describeModel.push({
                name: model,
                attributes: d,
            })
        }
        res.status(200).send(describeModel)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getAttributes(req, res) {
    try {
        const name = req.params.name
        console.log(db[name])
        res.status(200).send(db[name].tableAttributes)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getAttributes,
    getModels,
}
