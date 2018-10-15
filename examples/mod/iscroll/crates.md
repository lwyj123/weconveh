// mod描述
```JSON
{
  "namespace": "sundog",
  "name": "typescript",
  "version": "0.0.1",
  "homepage": "https://ccv.com/sundog/typescript#readme",
  "workers": {  // worker并行执行加快速度，但需要预先检查变更提示冲突
    "webpack": {
      "script": "./scripts/check.js"
    },
    "package.json": { // 参考eject
      "script": "./scripts/add-package.js"
    },
  },
  // "environment": {
  //   "required": [{
  //     "package.json": {
  //       "has": [{
  //         "jQuery": "0.2.1",
  //         "keke": "0.2.5",
  //       }]
  //     }
  //   }],
  //   "conflict": [{
  //     "package.json": {
  //       "has": [{
  //         "vue": "*",
  //       }]
  //     }
  //   }]
  // }
}
```