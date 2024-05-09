const isTimeAvailable = (time) => {
    console.log(time)
    const length = time.endTime - time.startTime
    // showModel.find({"showTime.day": time.day}).then(existingTimes => {
        const existingTimes = [{startTime: 14, endTime: 18}, {startTime: 12, endTime: 15}, {startTime: 15, endTime: 16}, {startTime: 16, endTime: 18}, {startTime: 14, endTime: 20}, {startTime: 18, endTime: 19}, {startTime: 12, endTime: 14}, {startTime: 10, endTime: 12}, {startTime: 22, endTime: 28}, {startTime: 18, endTime: 20},]
        console.log("what", existingTimes)
        for(var index in existingTimes) {
            const existingTime = existingTimes[index]
            const startAfterExisting = time.startTime >= existingTime.endTime
            const endAfterExisting = time.endTime > existingTime.startTime
            const endBeforeExisting = time.endTime <= existingTime.startTime
            const startBeforeExisting = time.startTime <= existingTime.endTime
            if((startAfterExisting === true) || (startBeforeExisting === true && endBeforeExisting === true)) {
                console.log("YES")
            }
            else {
                console.log("NO")
            }
        }
    // })
}

isTimeAvailable({startTime: 14, endTime: 18})