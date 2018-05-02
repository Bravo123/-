let topicItems = document.querySelectorAll('.topic-item');
topicItems.forEach( (item, index, arr) => {
    item.onclick = () => {
        location.href = '/menu/topic_details?id=' + item.getAttribute('data-topicid');
    };
});