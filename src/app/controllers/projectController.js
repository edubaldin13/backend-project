const express = require('express');

const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');

const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);

router.get('/:projectId',async (req,res)=>{
   try{
       const projects = await Project.find().populate('user');
        
       return res.send({ projects });
   }catch{
    return res.status(400).send({error:"Error loading projects"})
   }
})
// CRUD - GET

router.get('/:projectId', async(req,res)=>{
    try{
        const project = await Project.findById(req.params.projectId).populate('user');
         
        return res.send({ project });
    }catch{
     return res.status(400).send({error:"Error loading project"})
    }
})
// CRUD - POST

router.post('/:userId', async(req,res)=>{
    try{
        const project = await Project.create({ ...req.body, user: req.params.userId });
        return res.send({ project })
    }catch{
        return res.status(400).send({error:"Error creating new project"})
    }
})
// CRUD - PUT

router.put('/:projectId', async(req,res)=>{
    res.send({
        user: req.params.userId,
        
    });
})
// CRUD - DELETE

router.delete('/:projectId', async(req,res)=>{
    try{
        await Project.findByIdAndRemove(req.params.projectId);
         
        return res.send()
    }catch{
     return res.status(400).send({error:"Error deleting project"})
    }
})
module.exports = app => app.use('/projects', router);
