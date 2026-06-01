import json
with open('repos.json') as f:
    data = json.load(f)
for r in data:
    print(f"{r['name']:30s} stars={r['stargazers_count']:2d} forks={r['forks_count']:2d} lang={str(r['language']):15s} updated={r['pushed_at'][:10]}")
    if r.get('description'):
        print(f"  desc: {r['description']}")
    print()
