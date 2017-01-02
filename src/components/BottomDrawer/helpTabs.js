import React from 'react';

/* eslint-disable max-len */

const helpTabs = [
  {
    name: 'repo',
    content: <div>
      <p>Git repository (repo) contains your project’s code with it’s whole history.</p>
      <p>Init new git repository in current directory using <span className='help-container__git-command'>git init</span> or clone existing
        one using <span className='help-container__git-command'>git clone [source]</span></p>
    </div>
  },
  {
    name: 'stage',
    content: <div>
      <p>Add files to repository to tell git that it should track their changes.
         Stage files to tell git that they should be saved in forthcoming commit.</p>
      <p>Add files by <span className='help-container__git-command'>git add [filename]</span>. Use <span className='help-container__git-command'>git add -A</span> to add and/or
         stage all untracked files found in repo directory.</p>
    </div>
  },
  {
    name: 'commit',
    content: <div>
      <p>Commit is a snapshot of your project's source.
        It is is described by message, author and unique, auto-generated hash.</p>
      <p>Commit has always at least one parent (first commit is an exception).</p>
      <p>You can commit staged changes with <span className='help-container__git-command'>git commit -m [message]</span>.</p>
    </div>
  },
  {
    name: 'push',
    content: <div>
      <p>push</p>
    </div>
  },
  {
    name: 'pull',
    content: <div>
      <p>pull</p>
    </div>
  },
  {
    name: 'branch',
    content: <div>
      <p>Branch is simply a pointer to specific commit. „master” is an only and default branch in a new repository.
         Create branches when working on new specific feature or fix.</p>
      <p>Use <span className='help-container__git-command'>git branch [branchname]</span> to create new branch pointing to current commit.</p>
      <p>Switch branches using <span className='help-container__git-command'>git checkout [branchname]</span></p>
      <p>Create & switch to branch using <span className='help-container__git-command'>git checkout -b [branchname]</span></p>
    </div>
  },
  {
    name: 'checkout',
    content: <div>
      <p>checkout</p>
    </div>
  },
  {
    name: 'merge',
    content: <div>
      <p>Merge is a procedure of joining two or more histories. For example, we can merge our feature branch into main
         branch as we finished working on it. Merge creates a merge commit which has two or more parent commits.</p>
      <p>Use <span className='help-container__git-command'>git merge [branchX]</span> to merge branchX into current branch
         or <span className='help-container__git-command'>git merge [branchX] [branchY]</span> to merge branchX into branchY.</p>
    </div>
  },
  {
    name: 'reset',
    content: <div>
      <p>reset</p>
    </div>
  },
  {
    name: 'rebase',
    content: <div>
      <p>Rebase is a procedure of changing commit’s parent. Assume that you started a feature
         branch from develop. Before you merged your branch, someone else committed to develop.
         As you want to keep incremental history of project, you want your branch look like it
         started from current develop. So you take first commit you made on your branch and change
         it’s parent to last commit on develop. Of course you have to resolve possible conflicts
         in project's source.</p>
      <p>Type <span className='help-container__git-command'>git rebase [branchX]</span> to rebase current branch onto branchX
         or <span className='help-container__git-command'>git rebase [branchX] [branchY]</span> to rebase branchY onto branchX.</p>
    </div>
  },
  {
    name: 'tag',
    content: <div>
      <p>tag</p>
    </div>
  },
  {
    name: 'gitflow/feature',
    content: <div>
      <p>gitflow/feature</p>
    </div>
  },
  {
    name: 'gitflow/release',
    content: <div>
      <p>gitflow/release</p>
    </div>
  },
  {
    name: 'gitflow/hotfix',
    content: <div>
      <p>gitflow/hotfix</p>
    </div>
  }
];

/* eslint-enable max-len */

export default helpTabs;
