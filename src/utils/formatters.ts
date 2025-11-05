import {Segment} from "@/model/types";

export const dateFormatter = (dateString: string) => {
    const dateObject: Date = new Date(dateString);
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year = String(dateObject.getUTCFullYear()).slice(-2); // get last 2 digits
    return `${day}.${month}.${year}`;
}

export const formatTotalDistance = (segments: Segment[] = []) => {
    const dist = segments.reduce((s, seg) => s + (seg.distanceKm || 0), 0);
    return Math.round(dist * 10) / 10;
};
export const formatTotalDuration = (segments: Segment[] = []) => {
    const total = segments.reduce((s, seg) => s + (seg.durationMinutes || 0), 0);
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    return hours ? `${hours} ч ${mins} мин` : `${mins} мин`;
};
export const formatDateShort = (d?: string) => {
    if (!d) return '';
    return new Date(d).toLocaleString('ru-RU', {day: 'numeric', month: 'short'});
};

export const formatTime = (d?: string) => {
    if (!d) return '';
    return new Date(d).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatSeconds = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const mins = sec % 60;
    return hours ? `${hours} ч ${mins} мин` : `${mins} мин`;
};

const today = new Date();
export const localeDateString = today.toLocaleDateString('ru-RU', {weekday: 'long', day: 'numeric', month: 'long'});