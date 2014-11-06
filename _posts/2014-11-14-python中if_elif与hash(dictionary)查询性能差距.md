---
  title: python中if_elif与hash(dictionary)的性能差距
  category: 后端技术
  layout: post
  describer: 本文是为了说明在Python语言中，或不止python还有比如ruby这种动态语言使用ifelse会造成巨大的性能浪费
---

#  Python中if_elif与hash(dictionary)的性能差距
<br/>
<img src="http://img16.poco.cn/mypoco/myphoto/20141106/20/1747914202014110620595203.jpg?124x48_120" style="width:180px;height:108px;" >
<br/>
为什么要进行这个专题研究，主要最近在看同事代码过程中，发现使用了很多if-else-elif做switch（case）语句的判断操作，而我以前写ruby的时候，听说过如果遇到
这种情况，应该避免使用判断逻辑分支，而是使用hash这种数据结构自带的查询机制，会有性能上巨大优势，而且语句更加优美,
但是到底有多大的性能优势我下面写个python的示范出来,在这之前我要介绍下python的内建方法`dis`详细请看[dis官方说明](https://docs.python.org/2/library/dis.html)
简单来说他就是python虚拟机运行时,编译出来的汇编码，我们可以通过汇编的操作看出这两者间的性能差距

    #encoding:utf-8
    import dis

    def func_a():
         print "I am is func_a"
    def func_b():
         print "I am is func_a"
    def func_c():
         print "I am is func_c"

    '''
    调用方式A
    '''
    def  case_a(n):
            if n == "a" :
                    func_a
            elif n == "b" :
                    func_b
            elif n == "c" :
                    func_c
    '''
    调用方式b
    '''
    func_map = {"a":func_a,"b":func_b,"func_c":func_c}
    def case_b(n):
            func_map[n]()
         
    print 'case_a'
    dis.dis(case_a)

    print 'case_b'
    dis.dis(case_b)

你可以把这段代码copy到一个文件再执行比如`python youFileName.py`也可以直接在python命令行中调试运行,怎么做取决与你,
在我本机中，我的运行效果如下

    case_a
    15           0 LOAD_FAST                0 (n)
                 3 LOAD_CONST               1 ('a')
                 6 COMPARE_OP               2 (==)
                 9 POP_JUMP_IF_FALSE       19

    16          12 LOAD_GLOBAL              0 (func_a)
                15 POP_TOP             
                16 JUMP_FORWARD            38 (to 57)

    17     >>   19 LOAD_FAST                0 (n)
                22 LOAD_CONST               2 ('b')
                25 COMPARE_OP               2 (==)
                28 POP_JUMP_IF_FALSE       38

    18          31 LOAD_GLOBAL              1 (func_b)
                34 POP_TOP             
                35 JUMP_FORWARD            19 (to 57)

    19     >>   38 LOAD_FAST                0 (n)
                41 LOAD_CONST               3 ('c')
                44 COMPARE_OP               2 (==)
                47 POP_JUMP_IF_FALSE       57

    20          50 LOAD_GLOBAL              2 (func_c)
                53 POP_TOP             
                54 JUMP_FORWARD             0 (to 57)
           >>   57 LOAD_CONST               0 (None)
                60 RETURN_VALUE        
    case_b
    26           0 LOAD_GLOBAL              0 (func_map)
                 3 LOAD_FAST                0 (n)
                 6 BINARY_SUBSCR       
                 7 CALL_FUNCTION            0
                 10 POP_TOP             
                 11 LOAD_CONST               0 (None)
                 14 RETURN_VALUE        
OK!现在我们还看看这机器嘛，其实不懂汇编也没关系，我们可以看两个方法执行长度case_A有28行,而case_b只有区区的6行，
再看执行，我们看到case_a每个分支都会执行方法（function）入栈,判断执行然后再出栈,整个过程繁杂琐碎，冗余不堪，
现在大家知道，我们只是小小写个if-elif却这么大的性能差距,写代码时後，大家还是要注意尽量不写if-elif,多用hash来代替
另外如果代码中太多IF ELSE 建议还是看看是不是陷入了流程思维，一般这种情况可以用比如多态设计模式来避免，而像
python ruby这一类的动态语言也可以用闭包（lamda）之类的方法传递来解决。
(完)
