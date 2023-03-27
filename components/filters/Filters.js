const filters = [
    {
        id: 'today',
        name: 'Today',
        criteria: {
            schedule: new Date().toISOString().slice(0, 10)
        }
    },
    {
        id: 'tomorrow',
        name: 'Tomorrow',
        criteria: {
            schedule: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 10)
        }
    },
    {
        id: 'overdue',
        name: 'Overdue',
        criteria: {
            schedule: { $lt: new Date().toISOString().slice(0, 10) },
            done_check: false
        }
    }
];
