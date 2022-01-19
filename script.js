let url = 'https://jsonplaceholder.typicode.com'
let title = document.getElementById('postTitle')
let description = document.getElementById('postDescription')
let listComments = document.getElementById('listOfComments')
let input = document.getElementById('newComment')
let button = document.getElementById('addBtn');


class Posts {
    constructor(id) {
        this.id = id;
        button.addEventListener('click', (event) => {
            post.addNewComment(input.value, 1);
        });
    };

    async getPostFromLists() {
        try {
            let res = await fetch(`${url}/posts/${this.id}`);
            return res.json();
        } catch (err) {
            console.log(err);
        };
    };

    async getCommFromList() {
        try {
            let res = await fetch(`${url}/comments?postId=${this.id}`);
            return res.json();
        } catch (err) {
            console.log(err);
        };
    };

    async showPostFromLists() {
        try {
            let data = await this.getPostFromLists(1);
            this.renderPost(data);
        } catch (err) {
            console.log(err);
        };
    };

    async showCommFromList() {
        try {
            let data = await this.getCommFromList(1);
            this.renderComments(data);
        } catch (err) {
            console.log(err);
        };
    };

    renderPost(post) {
        let renderTitle = '';
        let renderDescription = '';
        renderTitle += `<h2 data-id="${post.id}">${post.title}</h2>`;
        renderDescription += `<p data-id="${post.id}">${post.body}</p>`;
        title.innerHTML = renderTitle;
        description.innerHTML = renderDescription;
    };

    renderComments(comments) {
        let lis = '';
        for (let el of comments) {
            if (!el) {
                return;
            };
            lis += `<li data-id="${el.id}">${el.email} : ${el.body}</li>`;
        };
        listComments.innerHTML = lis;
    };

    async addNewComment(data, postId) {
        try {
            await fetch(`${url}/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    postId: postId,
                    body: data,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((res) => res.json())
            .then((json) => this.showNewComment(json));
        } catch (err) {
            console.log(err);
        };
    };

    showNewComment(data) {
        let newComment = document.createElement('li');
        newComment.innerHTML = `user@gmail.com : ${data.body}`
        listComments.append(newComment);
    };
};

let post = new Posts(1);
post.showPostFromLists();
post.showCommFromList();