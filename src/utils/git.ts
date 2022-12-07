import { execaSync } from "execa"
import dayjs from "dayjs"

export const getGitStat = (path: string) => {
  const { stdout } = execaSync("git", ["--no-pager", "shortlog", "-nes", "HEAD", "--", path])
  return stdout
    .split("\n")
    .map(item => item.trim().match(/^(\d+)\t(.*) <(.*)>$/))
    .filter((item): item is RegExpMatchArray => item !== null)
    .map(([, commits, name, email]) => ({
      author: name,
      email,
      commits: Number.parseInt(commits, 10),
    }))[0]
}

export const getUpdateTime = (path: string): string => {
  const { stdout } = execaSync("git", ["--no-pager", "log", "--format=%at", "-1", path])
  return dayjs.unix(Number(stdout.trim())).format("YYYY-MM-DD HH:mm:ss")
}

export const getCreateTime = (path: string) => {
  const { stdout } = execaSync("git", ["--no-pager", "log", "--diff-filter=A", "--format=%at", path])
  return dayjs.unix(Number(stdout.trim())).format("YYYY-MM-DD HH:mm:ss")
}
