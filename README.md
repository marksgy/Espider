# Introduction to Espider
## What is Espider
A web spider based on electron

## How to use it？
### 1. Insert your target web address.
![](https://user-images.githubusercontent.com/21007696/47963742-2152d800-e06b-11e8-9fbe-728e5bbfefbc.png)

### 2. Select your page type
* **Page** means the entry page of your multi-level spider which includes the action of "turning-page".
* **Title** means the web link in the **Page** above that leads you to the next level.
* **Content** means the bottom-level page where your target damentta lies.
* **Search** means the kind of web spider that can be used to search a data base and download sth like that
(which is still under development)
![](https://user-images.githubusercontent.com/21007696/47963767-6545dd00-e06b-11e8-9f06-1b33067da483.png)

### 3. Go into the page to select the content you like
* Click this button
![](https://user-images.githubusercontent.com/21007696/47964090-92948a00-e06f-11e8-952b-5b4ac460121b.png)
* Select your content by a single click, while Espider will automatically select the same type of the content for you
![](https://user-images.githubusercontent.com/21007696/47964116-e1daba80-e06f-11e8-9060-b19e006c64b0.png)
* If you do it wrong, just right-click the content you have just selected. 

### 4. Close the new window

### 5. Click the spider button to get the content you want(by default its in your ??folder,and you can configurate it in the settings)
![]()

## Examples
### 1. Single page      
take [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Selection) for example      
>Just select the **Content** type, open a new page, select whatever you want, close the new page,and click the **spider** button
  ![](https://user-images.githubusercontent.com/21007696/47964299-b7d6c780-e072-11e8-909c-8a223a66fd5d.png)

### 2. Double-level spider
>For example, you want to get all of the APIs from [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API)
>* Just select the **Title** type, open a new page, select one of the API name and the rest of them will be labeled automatically.
>* Next do what **Example 1** did
>* You will see a chart appear in the bottom part of the main page.
>![](https://user-images.githubusercontent.com/21007696/47966017-aac4d300-e088-11e8-8426-1f7a36fd805b.png)

### 3. Multi-level spider
>For example,The 51job
>[Its a chinese job hunt website](https://search.51job.com/list/180200,000000,0000,00,9,99,%25E8%258B%25B1%25E8%25AF%25AD%25E8%2580%2581%25E5%25B8%2588%2B%25E5%2588%259D%25E4%25B8%25AD,2,1.html?lang=c&stype=1&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=1&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=)
>* First, you can select the **Page** type, which means you need the funtion of turning pages.You slide down to the bottom and click the button indicating pages.
>![](https://user-images.githubusercontent.com/21007696/47966071-3cccdb80-e089-11e8-83bd-d4305660aebb.png)
>* Second, you can repeat the steps of **Example 2** until you reached the content you want.

## Questions   
   1.What's the difference between **Page** and **Title**?   
   Well,**Page** is specially modified to cater the page turning function, which will automatically parse the url of the button and form the right url of the next page.
