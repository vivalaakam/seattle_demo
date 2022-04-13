```
use seattle_scheduler
db.createCollection(logs)

db.createUser(
  {
    user: "seattle",
    pwd: "seattle_pass",
    roles: [
      { role: "readWrite", db: "seattle_scheduler" }
    ]
  }
)
db.createUser(
  {
    user: "root",
    pwd: "root",
    roles: [
      { role: "readWrite", db: "seattle_scheduler" }
    ]
  }
)
```
