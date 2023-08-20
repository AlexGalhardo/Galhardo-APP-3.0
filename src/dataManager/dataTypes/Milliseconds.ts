class Milliseconds {
    public secondsToMilliseconds(seconds: number): number {
        return seconds * 1000;
    }

    public minutesToMilliseconds(minutes: number): number {
        return minutes * 60000;
    }

    public hoursToMilliseconds(hours: number): number {
        return hours * 3600000;
    }

    public daysToMilliseconds(days: number): number {
        return days * 86400000;
    }

    public get secondInMilliseconds() {
        return 1000;
    }

    public get minuteInMilliseconds() {
        return 60000;
    }

    public get hourInMilliseconds() {
        return 3600000;
    }

    public get methods() {
        return {
            secondsToMilliseconds: this.secondsToMilliseconds,
            minutesToMilliseconds: this.minutesToMilliseconds,
            hoursToMilliseconds: this.hoursToMilliseconds,
            daysToMilliseconds: this.daysToMilliseconds,
            secondInMilliseconds: this.secondInMilliseconds,
            minuteInMilliseconds: this.minuteInMilliseconds,
            hourInMilliseconds: this.hourInMilliseconds,
        };
    }
}

export default Milliseconds;
