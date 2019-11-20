const core = require('@actions/core');
const {context, GitHub} = require('@actions/github')


const thumbsUp = ({owner, repo, id}) => {
    const client = new GitHub(process.env.GITHUB_TOKEN);

    return client.reactions.createForIssueComment({
        owner,
        repo,
        comment_id: id,
        content: 'rocket'
    })
}

const getData = () => {
    if (context.eventName === 'issue_comment') {
        return {
            body: context.payload.comment.body,
            id: context.payload.comment.id,
        }
    } else {
        return {
            body: context.payload.pull_request.body,
            id: context.payload.pull_request.id,
        }
    }
}

// most @actions toolkit packages have async methods
async function run() {
    const trigger = core.getInput('trigger');
    if (!trigger) {
        core.setFailed('No `trigger` input given, aborting.')
        return
    }

    console.log(context.eventName)
    console.log(context)
    console.log(context.payload)
    core.debug((new Date()).toTimeString())
    core.debug((new Date()).toTimeString())
    const {owner, repo} = context.repo;

    const {body, id} = getData();
    if (body.includes(trigger)) {
        core.setOutput('triggered', 'true');
        console.log('sending a thumbs up to', owner, repo, id)
        await thumbsUp({owner, repo, id})
    } else {
        core.setOutput('triggered', 'false');
    }
}

run()
