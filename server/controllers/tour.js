import express from "express";
import TourModel from "../models/tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModel({
    ...tour,
    creater: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await TourModel.find();
    res.status(200).json(tours);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModel.findById(id);
    res.status(200).json(tour);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};