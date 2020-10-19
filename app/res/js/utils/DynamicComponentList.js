// import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

class DynamicComponentList {
    constructor(component, dataPropForIndex) {
        this.componentClass = Vue.extend(component);
        this.dataPropForIndex = dataPropForIndex;
        this.items = [];
    }

    createComponentElement(index) {
        let instance;
        if (this.dataPropForIndex) {
            instance = new this.componentClass({
                propsData: {[this.dataPropForIndex]: index},
            });
        } else {
            instance = new this.componentClass();
        }
        // vue component is rendered at the end of the dom
        // component can later be injected into codemirror as a line-widget
        instance.$mount();
        return instance.$el;
    }

    setLength(length) {
        // add components if there are not enouph
        if (this.items.length < length) {
            for (let i = this.items.length; i <= length; i++) {
                this.items.push(this.createComponentElement(i));
            }
            // remove components if there are a lot to many
        } else if (this.items.length > length + 10) {
            this.items.splice(length);
        }
        console.log(this.items.length);
    }
}

export default DynamicComponentList;