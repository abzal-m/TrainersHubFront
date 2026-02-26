import {string} from "zod";

export interface Activity {
    athlete: Athlete
    name: string
    sport_type: string;
    distance: number; // meters
    moving_time: number; // seconds
    total_elevation_gain: number; // meters
    average_speed: number; // m/s
    average_cadence: number;
    average_heartrate: number;
    max_heartrate: number;
    start_date_local: string
}

export type UplaodActivity = {
    trainingId: number;
    title: string;
    durationMinutes: number;
    elevationGain: number;
    avgHeartRate: number;
    avgCadence: number;
    rpe: number;
    wellbeing: string;
    athleteNotion: string;
}

export type Trainings = {
    trainingId: number;
    title: string;
    isDone: boolean;
    description: string;
    trainerName: string;
    athleteName: string;
    trainingDay: string;
    segments: Segment[];
}
export type ShortTrainings = {
    trainingId: number;
    title: string;
    isDone: boolean;
    trainingDay: Date;
}

export type AllTrainings = {
    todayTraining: Trainings;
    futureTraining: Trainings[];
}

export type Segment = {
    order: number;
    targetHeartRate: number;
    targetCadence: number;
    durationMinutes: number;
    distanceKm: number;
}

type Athlete = {
    id: string;
}
export type MyAthlete = {
    id: string;
    username: string;
    email: string;
}

export type AllStats = {
    all_run_totals: StatsModel
    all_ride_totals: StatsModel
}
export type StatsModel = {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
}
export type AllTrainingResults = {
    trainingId: number;
    username: string;
    title: string;
    durationMinutes: number;
    elevationGain: number;
    avgHeartRate: number;
    avgCadence: number;
    rpe: number;
    wellbeing: string;
    athleteNotion: string;
    createdAt: string;
}