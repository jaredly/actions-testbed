const core = require('@actions/core');
const {context} = require('@actions/github')


// most @actions toolkit packages have async methods
async function run() {
    console.log(Object.keys(context))
    console.log(context.payload)
    const trigger = core.getInput('trigger');
    core.debug((new Date()).toTimeString())
    core.debug((new Date()).toTimeString())
}

run()
