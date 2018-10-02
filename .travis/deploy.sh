#!/bin/bash

# print outputs and exit on first failure
set -xe

if [ $TRAVIS_BRANCH == "travis" ] ; then

    # setup ssh agent, git config and remote
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_rsa
    git remote add deploy "deploy@142.93.124.203:/var/www/html/beccaandgonzo.love-client/.git"
    git config user.name "Travis CI"
    git config user.email "deploy@142.93.124.203"

    rm -f .gitignore
    cp .travis/.deployignore .gitignore
    git add -f dist/
    git status # debug
    git commit -m "Deploy"
    git push -f deploy HEAD:refs/heads/master

else

    echo "No deploy script for branch '$TRAVIS_BRANCH'"

fi