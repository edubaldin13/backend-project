const express = require('express');

const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');

const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);

router.get('/:projectId',async (req,res)=>{
   try{
       const projects = await Project.find().populate(['user', 'taks']);
        
       return res.send({ projects });
   }catch{
    return res.status(400).send({error:"Error loading projects"})
   }
})
// CRUD - GET

router.get('/:projectId', async(req,res)=>{
    try{
        const project = await Project.findById(req.params.projectId).populate(['user', 'taks']);
         
        return res.send({ project });
    }catch{
     return res.status(400).send({error:"Error loading project"})
    }
})
// CRUD - POST

router.post('/:userId', async(req,res)=>{
    try{
    const { title,description,tasks } = req.body;

        const project = await Project.create({ title, description, user: req.params.userId });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask)
        }));

        await project.save();

        return res.send({ project })
    }catch (err){
        console.log(err)
        return res.status(400).send({error:"Error creating new project"});
        
    }
})
// CRUD - PUT

router.put('/:projectId', async(req,res)=>{
    try{
        const { title,description,tasks } = req.body;
    
            const project = await Project.findByIdAndUpdate(req.params.projectId,
                { 
                    title, 
                    description, 
                }, {new:true});
                project.tasks = [];
                await Task.deleteOne({ project: project._id })
            await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ ...task, project: project._id });
    
                await projectTask.save();
    
                project.tasks.push(projectTask);
            }));
    
            await project.save();
    
            return res.send({ project });
        }catch (err){
            console.log(err)
            return res.status(400).send({error:"Error updating project"});
            
        }
    });

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
