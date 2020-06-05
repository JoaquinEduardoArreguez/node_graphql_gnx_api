# Install Node Packages Globally (linux) 

#### Set up a package root in your homedir to hold the Node "global" packages:

>NPM_PACKAGES="$HOME/.npm-packages"
>mkdir -p "$NPM_PACKAGES"

#### Set NPM to use this directory for it's global package installs:  

>echo "prefix = $NPM_PACKAGES" >> ~/.npmrc

#### Configure your PATH and MANPATH to see commands in your $NPM_PACKAGES prefix by adding the following to your .bashrc:

#### NPM packages in homedir
>NPM_PACKAGES="$HOME/.npm-packages"

#### Tell our environment about user-installed node tools
>PATH="$NPM_PACKAGES/bin:$PATH"

#### Unset manpath so we can inherit from /etc/manpath via the `manpath` command
>unset MANPATH
>MANPATH="$NPM_PACKAGES/share/man:$(manpath)"

#### Tell Node about these packages
>NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"