export interface Activity {
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