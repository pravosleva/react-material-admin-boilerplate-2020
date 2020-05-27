#!/bin/bash

echo "===> POSTBUILD STARTED"

EXTERNAL_DIR=""$(dirname "$PWD")""

# Step 1: Create target dir if necessary
if [ ! -d "${EXTERNAL_DIR}/public" ];
then
  mkdir "${EXTERNAL_DIR}/public"
  if [ ! $? -eq 0 ]; then
    echo "ERROR: ${EXTERNAL_DIR}/public could not be created!"
    exit 1
  fi
else
  rm -rf ${EXTERNAL_DIR}/public/*;
fi

echo -ne '##                        (10%)\r'

# Step 2: Copy build product from ./build/ to ../public/ dir
for i in ./build/*; do cp -r $i "${EXTERNAL_DIR}/public"; done;

echo -ne '######                    (30%)\r'

echo -ne '########################  (100%)\r'

echo "===> POSTBUILD COMPLETED "

exit 0
