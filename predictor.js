document.getElementsByXPath = function (expression, parentElement) {
    var r = []
    var x = document.evaluate(expression, parentElement || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    for (var i = 0, l = x.snapshotLength; i < l; i++) {
        r.push(x.snapshotItem(i))
    }
    return r
}

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "SHOW_PROGRESS_PREDICTION":
                predict(message.velocity);
                break;
            default:
                console.log('default');
        }
    }
);

function predict(velocity) {
    // 既存のマイルストーンを消す
    var milestones = document.getElementsByClassName('milestone-record');
    var milestonesCount = milestones.length
    for (var i = 0; i < milestonesCount; i++) {
        milestones[milestonesCount - i - 1].remove()
    }

    // 年末までのスプリントとポイントの計算
    var diffTime = new Date('2019-12-31T00:00:00+09:00').getTime() - new Date().getTime()
    var diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    var restSprintCount = parseInt(diffDay / 14);
    endYearCompletablePoint = restSprintCount * velocity

    // 2月末までのスプリントとポイントの計算
    diffTime = new Date('2020-02-29T00:00:00+09:00').getTime() - new Date().getTime()
    diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    restSprintCount = parseInt(diffDay / 14);
    var februaryYearCompletablePoint = restSprintCount * velocity

    const backlogDivList = document.getElementsByClassName('js-issue-list ghx-issues ghx-has-issues')[1].children;

    var sprintStoryPoint = 0;
    var endYearChecked = false;

    for (var i = 0; i < backlogDivList.length; i++) {
        const record = backlogDivList[i];
        if (!record.classList.contains('js-issue')) {
            continue;
        }
        storyPointText = record.getElementsByClassName('aui-badge ghx-statistic-badge')[0].innerText
        let storyPoint = 0;
        if (storyPointText !== '-') {
            storyPoint = parseInt(storyPointText);
        }
        if (sprintStoryPoint + storyPoint > februaryYearCompletablePoint) {
            record.prepend(createBorderElement('2020年2月末', sprintStoryPoint))
            break;
        } else if (sprintStoryPoint + storyPoint > endYearCompletablePoint) {
            if (endYearChecked) {
                sprintStoryPoint += storyPoint
                continue;
            }
            record.prepend(createBorderElement('2019年12月末', sprintStoryPoint))
            endYearChecked = true;
        }
        sprintStoryPoint += storyPoint
    }
    console.log('合計ストーリーポイントは' + sprintStoryPoint + 'でした')

    Toastify({
        text: "マイルストーンを設置しました",
        duration: 3000,
        position: 'left'
    }).showToast();
}

function createBorderElement(time, totalPoint) {
    boldElement = document.createElement('b')
    boldElement.append(time)
    boldElement.style.marginRight = '10px';
    element = document.createElement('div');
    element.className = 'milestone-record'
    element.append(boldElement)
    element.append('までの消化見込みはここまでです！ 合計消化ポイントは' + totalPoint + 'です！');
    element.style.backgroundColor = '#0065ff'
    element.style.color = '#fff'
    element.style.padding = '10px 18px'
    return element;
}