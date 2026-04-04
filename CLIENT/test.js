// TestCafe functional tests for Task Manager

import { Selector } from 'testcafe';

fixture('Task Manager Test')
    .page('file:///D:/cet252/client/index.html');

test('Load tasks button works', async t => {
    const button = Selector('button').withText('Load Tasks');
    const tasks = Selector('.task');

    await t
        .click(button)
        .expect(tasks.count).gt(0);
});
test('Tasks display correct content', async t => {
    const button = Selector('button').withText('Load Tasks');
    const firstTask = Selector('.task').nth(0);

    await t
        .click(button)
        .expect(firstTask.innerText).notEql('');
});
test('Refresh button reloads tasks', async t => {
    const refreshBtn = Selector('button').withText('Refresh');
    const tasks = Selector('.task');

    await t
        .click(refreshBtn)
        .expect(tasks.count).gt(0);
});
test('Add task button opens form', async t => {
    const addBtn = Selector('button').withText('Add Task');
    const form = Selector('#formContainer');

    await t
        .click(addBtn)
        .expect(form.visible).ok();
}); 