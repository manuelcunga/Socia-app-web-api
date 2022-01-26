#!/bin/sh

yarn seed:admin
yarn typeorm migration:run
yarn dev

