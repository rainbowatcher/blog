---
layout: post
title: Golang 协程
subtitle:
date: 2023-06-27
permalinkPattern: /post/:year/:month/:day/:slug/
useHeaderImage: true
tags: [Golang]
---

## go 关键字

go 会触发新建子协程，下面代码子协程和主协程并行运行，但是**主协程不会等待子协程**执行结束，所以最终结果会是9-10条

```go
package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
```

想让主协程等待子协程执行结束，可以使用`sync.WaitGroup`来实现协程等待

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func say(s string, wg *sync.WaitGroup) {
	defer wg.Done() // 通知WaitGroup当前goroutine执行完成
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	var wg sync.WaitGroup // 创建一个WaitGroup
	wg.Add(2)             // 增加WaitGroup的计数器，表示要等待两个goroutine

	go say("world", &wg) // 在新的goroutine中执行say函数
	say("hello", &wg)    // 在主goroutine中执行say函数

	wg.Wait() // 等待所有goroutine执行完成

	fmt.Println("All goroutines have finished.")
}
```

```go
package main

import (
	"fmt"
	"time"
)

func say(s string, done chan bool) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
	done <- true // 子协程执行完成，向通道发送信号
}

func main() {
	done := make(chan bool) // 创建一个无缓冲通道

	go say("world", done) // 在新的协程中执行say函数
	go say("hello", done)    // 在主协程中执行say函数

  // 等待通道接收到子协程完成的信号
	<-done
	<-done

	fmt.Println("All goroutines have finished.")
}
```
