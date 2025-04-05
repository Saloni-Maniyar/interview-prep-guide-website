require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const JWT=require('jsonwebtoken');
const User=require('../models/User');
const Roadmap=require('../models/Roadmap');
const { authenticateUser } = require('../middleware/authMiddleware');
const Progress = require('../models/Progress');


const JWT_SECRET =  process.env.JWT_SECRET;
//Get all roadmap route for displaying all roadmaps to users
router.get('/roadmap',async(req,res)=>{
    try{
        const roadmaps=await Roadmap.find();
        if(!roadmaps){
           return res.status(400).json({message:"Nothing in Roadmaps collection..add roadmaps"});
        }
        return res.status(200).json(roadmaps);
    }catch(error){
        return res.status(500).json({message:`Server/database Error:${error}`});
    }
   

});


//Roadmap followed by particular user to show on dashboard
router.get('/roadmap/progress', authenticateUser, async (req, res) => {
  console.log("req.user in /progress route:", req.user); // Debug User Info

  try {
    const userId = req.user._id;

   

    // Using populate
    const roadmaps = await Progress.find({ userId:userId}).populate('roadmapId');
    console.log("Populated Progress:", roadmaps); // Check populated output

    if (roadmaps.length === 0) {
      return res.status(400).json({ message: "Not followed any roadmap yet. Follow roadmap" });
    }

    return res.status(200).json(roadmaps);
  } catch (error) {
    return res.status(500).json({ message: `Server/database Error: ${error}` });
  }
});


//update the progress document completedSteps when user ticks the checkbox
/**
 * frontend sends
 *  roadmapId ,text of substep ticked or unticked and true or false
 *  accordingly by ticked unticked
 * */
router.patch('/roadmap/progress/update',authenticateUser,async(req,res)=>{
    const userId=req.user._id;
    const { roadmapId, subStepText, checked } = req.body;
    if (!roadmapId || !subStepText || typeof checked !== 'boolean') {
        return res.status(400).json({ message: "roadmapId, subStepText and checked (true/false) are required" });
      }
      
    try{
        const progress = await Progress.findOne({ userId, roadmapId });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found for this roadmap" });
    }   

    if(checked){
        //if done then add to progress
        if (!progress.completedSteps.includes(subStepText)) {
            progress.completedSteps.push(subStepText);
        }
    }else{
        //remove the substep from progress if undone
        progress.completedSteps = progress.completedSteps.filter(step => step !== subStepText);
    }
    await progress.save();
    res.status(200).json({ message: "Progress updated", completedSteps: progress.completedSteps });

    }catch(error){
        return res.status(500).json({message:`Server/database Error:${error}`});
    }
});

//calculate user roadmap completion progress and fetch
// Get roadmap progress with completion percentage for each followed roadmap
router.get('/roadmap/progress/percentage', authenticateUser, async (req, res) => {
    const userId = req.user._id;
    console.log(`user id ${userId}`);

  
    try {
      // Get all progress documents of the logged-in user
      const progressDocs = await Progress.find({ userId }).populate('roadmapId');
      console.log(`progressDocs:${progressDocs}`);
      if (!progressDocs || progressDocs.length === 0) {
        return res.status(404).json({ message: "User hasn't followed any roadmap yet." });
      }
  
      // Map each progress doc to calculate percentage
      const progressData = progressDocs.map(progress => {
        const roadmap = progress.roadmapId;
        console.log(`roadmap: ${roadmap}`);
        const completedSteps = progress.completedSteps || [];
        console.log(`completedSteps: ${completedSteps}`);
        // Flatten all substeps from roadmap steps
        const allSubsteps = roadmap.steps.flatMap(step => step.subSteps.map(sub => sub.text));
        console.log(`all sub steps:${allSubsteps}`);
        const total = allSubsteps.length;
        console.log("total substeps:"+total);
        const completed = completedSteps.length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  
        return {
          roadmapId: roadmap._id,
          title: roadmap.title,
          totalSteps: total,
          completedSteps: completed,
          completionPercent: percent
        };
      });
  
      return res.status(200).json(progressData);
    } catch (error) {
      return res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  });
  

  //fetch specific roadmap to display under dropdown after selecting roadmap from dropdown
router.get('/roadmap/:roadmapid',async(req,res)=>{
  try{
      const roadmap=await Roadmap.findById(req.params.roadmapid);
      if(!roadmap){
         return res.status(400).json({message:"Roadmap not found"});
      }
      return res.status(200).json(roadmap);
  }catch(error){
      return res.status(500).json({message:`Server/database Error:${error}`});
  }
 

});

//Roadmap followed by a  particular user

router.post('/roadmap/follow/:roadmapId',authenticateUser,async(req,res)=>{
  const roadmapId = new mongoose.Types.ObjectId(req.params.roadmapId);
  const userId=req.user?._id;
  
  try{
      console.log("User ID:", userId); // Debugging
      if (!userId) {
          return res.status(400).json({ message: "User ID missing from request" });
      }
  
      console.log("User ID:", userId); // Debugging
      const followedRoadmap=await Progress.findOne({userId,roadmapId});
      if(followedRoadmap){
          return res.status(400).json({message:`Roadmap already Followed by you . Follow another roadmap`});
      }
         // create new progress for the new roadmap followed.
  const newProgress = new Progress({
      userId,
      roadmapId,
      completedSteps: [],
      quizScores: [],
    });
   await newProgress.save();
   return res.status(201).json({ message: "Roadmap followed successfully!", progress: newProgress });
  }catch(error){
      return res.status(500).json({message:`Server/database Error:${error}`});
  }
  

});

module.exports=router;