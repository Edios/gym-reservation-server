const Class= require('../models/Classes');
const User=require('../models/User');
const mongoose = require('mongoose');

exports.getClasses=async(req,res)=>{
    try{
        const classes= await Class.find();
        res.json(classes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};

exports.reserveClasses=async(req,res)=>{
    const classId=req.params.classId;
    try{
        if (!classId) {
            return res.status(400).json({message: 'Class ID is required'});
        }

        const classObj=await Class.findById(classId);
        if (!classObj) {
            return res.status(400).json({message: 'Class not found'});
        }

        if (classObj.seats<=classObj.participants.length){
            return res.status(400).json({message:"Class is full"});
        }

        const isParticipant = classObj.participants.includes(req.user_id);
        if (isParticipant) {    
            return res.status(400).json({ message: "User is already a participant in this class" });
        }
        
        classObj.participants.push(req.user_id);
        await classObj.save();
        const user=await User.findById(req.user_id);
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }

        user.reservations.push(classId);
        await user.save();

        res.json({message:"Class reserved successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};

exports.removeParticipant=async(req,res)=>{
    const classId=req.params.classId;
    try{
        
        if (!classId) {
            return res.status(400).json({message: 'Class ID is required'});
        }
        
        const classObj=await Class.findById(classId);
        
        if (!classObj) {
            return res.status(400).json({message: 'Class not found'});
        }

        const isParticipant = classObj.participants.includes(req.user_id);
        if (!isParticipant) {
            return res.status(400).json({ message: "User is not a participant in this class" });
        }
        
        classObj.participants = classObj.participants.filter(
          (participantId) => participantId.toString() !== req.user_id
        );
        
        await classObj.save();
        
        const user=await User.findById(req.user_id);
        
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        
        user.reservations.pull(classId);
        
        await user.save();
        
        res.json({message:"Participant removed successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};

exports.addClasses = async (req, res) => {
    try {
        const { name, coach, location, seats, start_date, end_date } = req.body;
        if (!name || !coach || !location || seats == null) {
        return res.status(400).json({ message: 'All fields are required' });
        }
        if (seats <= 0) {
        return res.status(400).json({ message: 'Number of seats must be greater than 0' });
        }
        
        if (new Date(start_date) >= new Date(end_date)) {
        return res.status(400).json({ message: 'Start time must be before end time' });
        }
        
        const newClass = new Class({
            name,
            coach,
            location,
            seats,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
        });
        await newClass.save();
        res.status(201).json({ message: 'Class added successfully', class: newClass });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };