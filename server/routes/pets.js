const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

let pets = [
    { id: 1, name: 'tycho', type: 'dog', age: 2 },
    { id: 2, name: 'mika', type: 'dog', age: 1 },
    { id: 3, name: 'stringer', type: 'dog', age: 10 }
]

// router.get('/pets', (req, res) => {
//     res.json(pets)
// })

// router.get('/pets', async (req, res) => {
//     const pets = await prisma.pet.findMany()
//     res.json(pets)
// }) 

router.get('/pets', async (req, res) => {
    const { type, age_min, age_max } = req.query
  
    let whereClause = {}
  
    if (type) whereClause.type = type
    if (age_min) whereClause.age = { gte: parseInt(age_min) }
    if (age_max) whereClause.age = { ...whereClause.age, lte: parseInt(age_max) }
  
    try {
      const pets = await prisma.pet.findMany({
        where: whereClause,
      })

      res.json(pets)
    } catch (error) {
      res.status(500).send('Server Error')
    }
})  

// router.get('/pets/:petId', (req, res) => {
//     const petId = parseInt(req.params.petId)
//     const pet = pets.find(pet => pet.id === petId)

//     if (pet) {
//         res.json(pet)
//     }
//     else {
//         res.status(404).send('Pet not found')
//     }
// })

router.get('/pets/:petId', async (req, res) => {
    const petId = parseInt(req.params.petId)

    try {
        const pet = await prisma.pet.findUnique({
            where: {
                id: petId,
            },
        })

        if (pet) {
            res.json(pet)
        } else {
            res.status(404).send('Pet not found')
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching the pet.')
    }
})

// router.post('/pets', (req, res) => {
//     const { name, type, age } = req.body

//     const newPet = {
//         id: pets.length + 1,
//         name,
//         type,
//         age
//     }

//     pets.push(newPet)
//     res.status(201).json(newPet)
// })

router.post('/pets', async (req, res) => {
    let { name, type, breed, age } = req.body
    
    // Check for a name and set to "unknown" if not provided
    name = name || "unknown"

    try {
        const pet = await prisma.pet.create({
          data: {
            name,
            type,
            breed,
            age,
          },
        })

        res.json(pet)
    } catch (error) {
        res.status(500).send('An error occurred while creating the pet.')
    }
})  

// router.put('/pets/:petId', (req, res) => {
//     const { petId } = req.params
//     const petIndex = pets.findIndex(pet => pets.id === parseInt(petId))

//     if (petIndex != -1) {
//         const updatedPetInfo = req.body
//         pets[petIndex] = { ...pets[petIndex], updatedPetInfo }
//         res.json(pets[petIndex])
//     }
//     else {
//         res.status(404).send('Pet not found')
//     }
// })

router.put('/pets/:id', async (req, res) => {
    const { id } = req.params
    const { name, type, breed, age } = req.body

    const pet = await prisma.pet.update({
      where: { id: parseInt(id) },
      data: {
        name,
        type,
        breed,
        age,
      },
    })

    res.json(pet)
})  

// router.delete('/pets/:petId', (req, res) => {
//     const { petId } = req.params
//     const initialLength = pets.length
//     pets = pets.filter(pet => pet.id !== parseInt(petId))

//     if (pets.length < initialLength) {
//         res.status(204).send()
//     }
//     else {
//         res.status(404).send('Pet not found')
//     }
// })

router.delete('/pets/:id', async (req, res) => {
    const { id } = req.params

    await prisma.pet.delete({
      where: { id: parseInt(id) },
    })

    res.status(204).send()
})  

module.exports = router
