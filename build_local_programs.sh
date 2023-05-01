cd contracts

for FILE in *; do cd $FILE && leo build && cd ..; done
