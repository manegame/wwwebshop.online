#!/bin/bash
npm run build
surge --project ./dist --domain www3ebshop.surge.sh
