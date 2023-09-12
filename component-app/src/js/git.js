

/*
    git pull
    git fetch   更新远段分支并合并到本地 等于 git pull + git merge
    git add  提交到暂存区
    git commit 提交到本地分支
    git merge  合并分支 完整提交历史
    git rebase 基于某个分支变基，创造线性提交历史
    git checkout
        git checkout branch-name 切换分支
        git checkout -b new-branch-name 切换并创建分支
        git checkout commit-hash -- path/to/file1 path/to/file2 path/to/file3 将多个文件恢复到指定的提交节点

    git reset  将分支指针移动到指定的提交 --soft 会将更改留存在暂存区 --mixed 会将更改留存在工作区 --hard 重置暂存区和工作目录  
                禁止在公共分支上这样干
    git revert 用于创建一个新的提交，这个提交会撤销一个或多个之前的提交中所做的更改。这是在不重写提交历史的情况下撤销更改的方法。
                推荐在公共分支上这样做
                对于：A - B - C - D - E
                撤销 C到E的所有提交  git revert C^..E   变为 A - B - C - D - E - E' - D' - C'
                产生冲突后，解决冲突。然后git revert --continue 继续
                放弃操作 git revert --abort
    git stash 缓存工作区内容
    git pop 放出缓存区内容到工作区


    git log 提交日志
    git status

*/