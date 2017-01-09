import React from 'react';

/* eslint-disable max-len */

const helpTabs = [
  {
    name: 'repo',
    content: <div>
      <p>Git repository (repo) contains your project’s code with it’s whole history.</p>
      <p>Init new git repository in current directory using <span className='help-container__git-command'>git init</span>
         or clone existing one using <span className='help-container__git-command'>git clone [url]</span>.</p>
      <p>You can initialize git repository in an empty directory or one that already contains a project.
        Don't worry, any of your files will be changed, git will create a .git subdirectory containing everything it
        needs to work. Right after <span className='help-container__git-command'>git init</span> command your project
        isn't tracked yet. First you need to stage and commit files, to tell git that you want to track them.</p>
      <p>Cloning a repository also creates a subdirectory .git, but in this case it contains all history of existing
        project. Aside from that, you get a working copy of that project, with all it files.</p>
      <p>If at any time you would decide to stop using git, all you need to do is to delete .git subdirectory.
        It won't affect the rest of files.</p>
    </div>
  },
  {
    name: 'stage',
    content: <div>
      <p>If you want to start tracking a file or save changes of already tracked file, you need to add it to your
        staging area. All staged files will be saved in a forthcoming commit.</p>
      <p>Add a file to staging area with <span className='help-container__git-command'>git add [filename]</span>.
        Use <span className='help-container__git-command'>git add -A</span>
        to stage all untracked and modified files found in repo directory.</p>
      <p>You can unstage a file using <span className='help-container__git-command'>git reset HEAD [filename]</span>.</p>
      <p>Note that modifying a staged file won't change that file in the staging area.
        This means that if you want to save the most recent version of that file, you need to stage it again.</p>
    </div>
  },
  {
    name: 'commit',
    content: <div>
      <p>Commit is a snapshot of your project's source. It is is described by message, author and unique, auto-generated
        hash. It has always at least one parent (first commit is an exception).</p>
      <p>You can commit staged changes with <span className='help-container__git-command'>git commit -m [message]</span>.
        As a result, everything that was in your staging area is saved in your project history.</p>
      <p>Commit contain a snapshot of your whole project, not only the changes commited.
        This means that at any time you can revert all files back to the state they were
        or simply check how they looked like, when the commit was done.</p>
      <p>To revert your project back to the state at a specific commit use
        <span className='help-container__git-command'>git checkout [commitHash]</span>.</p>
    </div>
  },
  {
    name: 'branch',
    content: <div>
      <p>Branch is simply a pointer to specific commit. In a new repository 'master' is the only and default branch.
        You can have multiple branches in your repo and easily switch between them. Switching to a branch reverts
        all tracked files in your working directory back to the state they were in the commit the branch points to.
        Every time you commit, the pointer of the branch you're currently on moves forward automatically.</p>
      <p>Create branches when working on new specific feature or fix.</p>
      <p>Use <span className='help-container__git-command'>git branch [branch]</span> to create new branch pointing
        to current commit.</p>
      <p>Switch branches using <span className='help-container__git-command'>git checkout [branch]</span></p>
      <p>Create & switch to branch using <span className='help-container__git-command'>git checkout -b [branch]</span></p>
      <p>Tracking branch is a local branch set to track a remote branch - called upstream branch - from remote
        repository (see also: remote repos). Tracking branch has a direct relationship with it's upstream branch.
        If you're on a tracking branch and run <span className='help-container__git-command'>git pull</span> or
        <span className='help-container__git-command'>git push</span>, git knows which remote branch you want to
        synchronize with.</p>
      <p>To set an upstream branch of an existing local branch use <span className='help-container__git-command'>
      git branch -u [remote]/[remotebranch]</span>.</p>
      <p>To create & switch to a new local branch tracking a remote branch use
        <span className='help-container__git-command'>git checkout -b [branch] [remotename]/[remotebranch]</span>.</p>
    </div>
  },
  {
    name: 'checkout',
    content: <div>
      <p>Checkout command is used to switch branches or restore working tree files. Checking out a branch is checking
        out to a commit that branch points to. When you do this, your working directory is reverted back to the state it
        was in the snapshot that commit contains.</p>
      <p>Checkout branch using <span className='help-container__git-command'>git checkout [branch]</span>.</p>
      <p>Checkout a specific commit with <span className='help-container__git-command'>git checkout [commitHash]</span>.</p>
      <p>Note that when you checkout, files in your working directory change. If there are uncommited changes it cannot
        be done cleanly, so to prevent losing your work git will not let you checkout at all.</p>
      <p>There is a significant difference between checking a commit or a branch. After switching to a commit you are
        in a detached HEAD state. This means that you're not on any branch. In other words, there is no local working
        branch tracking changes. If you would decide to work on a project in that state and commit your changes, you
        might possibly loose them anyway, because no branch tracked it. In such situations it's best to start from
        creating a new branch pointing to that commit and then commit your modifications.</p>
    </div>
  },
  {
    name: 'merge',
    content: <div>
      <p>Merge is a procedure of joining two or more branches. As a result, different versions of the project are joined
        together to contain the changes from all merged branches. For example, we can merge a feature branch into main
        branch, when we finish working on it.</p>
      <p>Use <span className='help-container__git-command'>git merge [branchX]</span> to merge branchX into current branch
        or <span className='help-container__git-command'>git merge [branchX] [branchY]</span> to merge branchX into branchY.</p>
      <p>There are to basic types of merge:
        <ul>
          <li><b>fast-forward</b> - If the commit of the branch your merging into is a direct ancestor of branch
            your merging in, the pointer of a branch you're on will be simply moved forward. In this case, all commits
            of one branch have to be included in the second branch. The second branch has to contain all the commits
            from the first one, but can also have some additional newer commits.</li>
          <li><b>non-fast-forward merge</b> -  It usually happens when you merge branches that are the same till certain
            commit, but differ the rest. This is actually a common situation. At some point in a project the development
            continued in different directions, for example the work was done on two separate new features.
            In this case, simply moving the branch pointer forward isn't possible. Git creates a new snapshot
            that results from a three-way merge and automatically creates a new commit that points to it. This is
            referred to as a merge commit, and is special in that it has more than one parent. A three-way
            merge uses the two snapshots pointed to by the branch tips and the common ancestor of the two.</li>
        </ul>
        <p>You may want to make a non-fast-forward merge that creates a merge commit even if it is possible, to simply
          move the branch pointer forward. You can force git to do that with <span className='help-container__git-command'>
            git merge --no-ff [branchX]</span>. This is often used while merging a topic branch into main branch.</p>
      </p>
    </div>
  },
  {
    name: 'HEAD',
    content: <div>
      <p>Git keeps a special pointer called HEAD. It points to the current branch reference, which is in turn a pointer
        to the last commit made on that branch. Whenever the HEAD pointer is moved git records it in a log. You can
        check how it's position has changed with <span className='help-container__git-command'>git reflog</span>.</p>
      <p>You can refer to an ancestor of a commit HEAD is referencing. For example 'HEAD~' refers to a first ancestor of
        HEAD. You can use that with a number, for example 'HEAD~3' is equivalent to 'HEAD~~~' and means grand
        grandfather of commit pointed by HEAD.</p>
      <p>Command <span className='help-container__git-command'>git checkout [branch]</span> does two things.
        HEAD pointer is moved back to point to that branch and files in your working directory are reverted back to
        the snapshot that branch points to.</p>
      <p>When you checkout to a commit you are in a detached HEAD state. This means that HEAD pointer doesn't point to
        any branch but to a specified commit. Commits made in detached HEAD state don't belong to any branch and might
        be lost.</p>
    </div>
  },
  {
    name: 'reset',
    content: <div>
      <p>Reset command can be used to accomplish different things. You can use it to remove commits, unstage files or
        undo changes in your working directory. It resets current HEAD (read more: HEAD) to the specified state - in
        other words it moves HEAD pointer to a specified commit and can modify staging area and working directory.</p>
      <p>Command <span className='help-container__git-command'>git reset</span> can be run with one of three options:
        <ul>
          <li><b>--soft</b> - only moves a HEAD pointer and doesn't affect staging area or your working directory.</li>
          <li><b>--mixed</b> - this is a default option. In addition to moving HEAD, it also changes index file
            (where all staged files are - so in other words your staging area) to be like it was in a commit a HEAD
            pointer just moved to.</li>
          <li><b>--hard</b> - it moves HEAD pointer and reverts files back to a specified snapshot, but this time it
            affects not only your staging area but also your working directory. Be careful with this option, because
            it may cause you lose your work (even commited).</li>
        </ul>
        <p>You can unstage a file with <span className='help-container__git-command'>git reset [filename]</span>. This
          command is equivalent to <span className='help-container__git-command'>git reset --mixed HEAD [filename]
          </span>. It changes only your staging area. If you run this command without specifying a file, all your
          changes will be unstaged.</p>
        <p>Although <span className='help-container__git-command'>git reset --hard [commit]</span> can cause some
          damage, it might also be very helpful. If you want to revert and delete a commit you're currently on and
          return to a state saved in a previous one, you can accomplish it with
          <span className='help-container__git-command'>git reset --hard HEAD~</span>. For example, this can be used to
          revert a merge action.</p>
      </p>
    </div>
  },
  {
    name: 'rebase',
    content: <div>
      <p>Rebase is a procedure of changing commit’s parent. Assume that you started a feature
        branch from develop. Before you merged your branch, someone else committed to develop.
        If you want to keep incremental history of project, you want your branch look like it
        started from current develop. So you take first commit you made on your branch and change
        it’s parent to last commit on develop. Of course you have to resolve possible conflicts
        in project's source.</p>
      <p>Type <span className='help-container__git-command'>git rebase [branchX]</span> to rebase current branch onto branchX
        or <span className='help-container__git-command'>git rebase [branchX] [branchY]</span> to rebase branchY onto branchX.</p>
    </div>
  },
  {
    name: 'remote repos',
    content: <div>
      <p> Remote repositories (remotes) are versions of your project that are hosted on the Internet or network
        somewhere. You need them to share and synchronize your work with others to collaborate on a project.</p>
      <p>If you used <span className='help-container__git-command'>git clone [url]</span> git has added for you
        a remote repo from given url as 'origin'. It also set up your local master branch to track the remote master
        branch (or whatever the default branch is called) on the server you cloned from. A repository created with
        <span className='help-container__git-command'>git init</span> doesn't have any remotes or tracking branches
        added by default.</p>
      <p>To add a remote use <span className='help-container__git-command'>git remote add [name] [url]</span>.</p>
      <p>Remove a remote with <span className='help-container__git-command'>git remote rm [name]</span>.</p>
      <p>When you commit your changes they are saved in your local repository. Most of git operations affect only your
        local repo. If you want to synchronize with your remote repository you need to fetch, pull or push data.</p>
    </div>
  },
  {
    name: 'pull',
    content: <div>
      <p>To get most recent data from a remote repo you need to fetch it. Usually you also want to merge it with your
        local repo. There is a command that does both fetching and merging -
        <span className='help-container__git-command'>git pull [remote] [remotebranch]</span>. Running it generally
        fetches data from specified remote repo and automatically tries to merge it into your local branch.</p>
      <p>By default, after fetching data pull command runs <span className='help-container__git-command'>git merge</span>
        to merge the retrieved branch into the current one. You can change that behaviour with --rebase option to tell
        git it should run <span className='help-container__git-command'>git rebase</span> instead.</p>
      <p>If your current branch is set up to track a remote branch, you can use
        <span className='help-container__git-command'>git pull</span> without any parameters to automatically fetch and
        then merge that remote branch into your current branch.</p>
    </div>
  },
  {
    name: 'push',
    content: <div>
      <p>If you want to synchronize with a remote repo and share your changes, you need to push them. The command for
        this is simple: <span className='help-container__git-command'>git push [remote] [remotebranch]</span>.
        But it works only if nobody has pushed in the meantime. If you have an outdated version of remote repo, your
        push will be rejected. First you’ll have to fetch the changes you don't have and merge them with yours before
        you’ll be allowed to push.</p>
      <p>When you're on a local branch that tracks a remote branch you can run
        <span className='help-container__git-command'>git push</span> without any parameters. Git knows exactly to which
        remote and which branch it should push.</p>
      <p>If you want your local branch to track a specific remote branch, you can set it while pushing to a remote with
        <span className='help-container__git-command'>git push -u [remote] [remotebranch]</span>. Next time you push
        from this branch you won't have to specify any parametrs. Git will push to the remote branch you configured
        as an upstream branch.</p>
    </div>
  },
  {
    name: 'tag',
    content: <div>
      <p>You can tag specific points in history of your project as being important. Typically tags are used to mark
        release points (v1.0, and so on). There are two types of tags:
        <ul>
          <li><b>lightweight</b> - like a branch that doesn’t change – it’s just a pointer to a specific commit.
            To create it run <span className='help-container__git-command'>git tag [tag] [commit]</span> without
            supplying the -a or -m option. If you don't specify a commit, the tag will be added to the current commit.
          </li>
          <li><b>annotated</b> - stored as full objects containing the tagger name, email, and date. Such tags can also
            have a tagging message. It’s generally recommended to create annotated tags to have all this information.
            The easiest way to create it is to specify -a when you run the tag command. If you want to specify a
            tagging message too, use <span className='help-container__git-command'>git tag -a [tag] -m [tag-message]
              [commit]</span>. If you don't specify a commit, the tag will be added to the current commit.</li>
        </ul></p>
      <p>To list all available tags simply run <span className='help-container__git-command'>git tag</span>.</p>
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
