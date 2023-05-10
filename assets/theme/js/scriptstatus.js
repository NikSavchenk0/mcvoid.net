var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

class Counter {
    constructor(startDelay, endDelay) {
        this.startDelay = startDelay || 20;
        this.endDelay = endDelay || this.startDelay;
    }

    runCounter(objID, start, finish) {
        const obj = document.getElementById(objID);
        let num = start;
        let delay = this.startDelay;
        let delayOffset = Math.floor((this.endDelay - this.startDelay) / (finish - start));
        let timerStep = function () {
            if (num <= finish) {
                obj.innerHTML = num;
                delay += delayOffset;
                num += 1;
                setTimeout(timerStep, delay);
            }
        }
        timerStep();
    }
}

let playersOnlineCounter = new Counter(1, 30);
window.onload = () => {
    $.get('https://api.minetools.eu/ping/' + SERVER_HOST).then((res) => {
        if (res.error)
            $('#playersOnline').html('OFFLINE');
        else
            playersOnlineCounter.runCounter('online', 0, res.players.online);
    }).catch(() => {
        $('#playersOnline').html('OFFLINE');
    });
};
