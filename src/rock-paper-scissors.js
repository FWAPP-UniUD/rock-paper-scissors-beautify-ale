import jQuery from 'jquery';

class RockPaperScissors {
    constructor(containerElement) {
        /* ... costruisco i vari componenti che
           devono interagire */
        this.mainElement = document.createElement('div');
        const title = document.createElement('h2');
        title.textContent = "Your Game";
        const button = document.createElement('button');
        button.classList.add('ui', 'button', 'labeled', 'icon');
        const icon = document.createElement('i');
        icon.classList.add('angle', 'double', 'right', 'icon');
        button.append(icon);
        button.append(document.createTextNode('Play!'));
        this.mainElement.append(title);
        this.labels = [ "Rock", "Paper", "Scissors" ];
        const grid = document.createElement('div');
        grid.classList.add('ui', 'grid', 'segment');
        for (let i = 0; i < 3; i++) {
            const column = document.createElement('div');
            column.classList.add('column', 'center', 'aligned');
            grid.append(column);
            const radioButton = document.createElement('input');
            radioButton.setAttribute('type', 'radio');
            radioButton.setAttribute('name', 'choice');
            radioButton.setAttribute('value', this.labels[i]);
            const label = document.createElement('label');
            label.classList.add('ui', 'label')
            const icon = document.createElement('i');
            icon.classList.add('hand', this.labels[i].toLowerCase(), 'icon');
            label.append(icon);
            label.append(document.createTextNode(this.labels[i]));
            column.append(radioButton);
            column.append(label);
        }
        this.mainElement.append(grid);
        this.mainElement.append(button);
        button.addEventListener('click', this.buttonPressed.bind(this));
        this.resultbox = document.createElement('div');
        this.resultbox.classList.add('ui', 'message');
        const header = document.createElement('div');
        header.classList.add('header');
        header.textContent = 'Your opponent played';
        this.result = document.createElement('p');
        this.resultbox.append(header);
        this.resultbox.append(this.result);
        this.mainElement.append(this.resultbox);
        /* prepare the modal */
        this.modal = document.createElement('div');
        this.modal.classList.add('ui', 'modal');
        const content = document.createElement('div');
        content.classList.add('content');
        this.modal.append(content);
        content.append(document.createTextNode('You must choose an option'));
        const actions = document.createElement('div');
        actions.classList.add('actions');
        const ok = document.createElement('div');
        ok.textContent = 'Ok';
        ok.classList.add('ui', 'ok', 'button');
        actions.append(ok);
        this.modal.append(actions);
        containerElement.append(this.modal);
        containerElement.append(this.mainElement);
    }
    randomDraw() {
        const v = Math.floor(3 * Math.random());
        this.opponentChoice = this.labels[v];
    }
    determineWinner(choice) {
        if (this.opponentChoice == "Rock") {
            switch (choice) {
            case "Rock": return "tie";            
            case "Paper": return "you";
            case "Scissors": return "opponent";
            }
        }
        else if (this.opponentChoice == "Paper") {
            switch (choice) {
            case "Rock": return "opponent";            
            case "Paper": return "tie";
            case "Scissors": return "you";
            }
        }
        else {
            // this.opponentChoice == "Scissors"
            switch (choice) {
            case "Rock": return "you";            
            case "Paper": return "opponent";
            case "Scissors": return "tie";
            }
        }
    }
    buttonPressed(event) {
        this.randomDraw();
        const myChoice = this.mainElement.querySelector('input[name="choice"]:checked');
        if (!myChoice) {
            jQuery(this.modal).modal('show');
        }
        else {
            /* determine a winner */
            const winner = this.determineWinner(myChoice.value);
            this.result.textContent = this.opponentChoice;
            this.resultbox.className = ""; // clears the list

            if (winner == 'you')
                this.resultbox.classList.add('ui', 'positive', 'message');
            else if (winner == 'tie') 
                this.resultbox.classList.add('ui', 'info', 'message');
            else
                this.resultbox.classList.add('ui', 'negative', 'message');
        }
    }
}

export default RockPaperScissors;