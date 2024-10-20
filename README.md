# Medicate Safe


"Today, 25% of all college students are taking some form of antidepressant, anti-anxiety, or mood stabilizer, and 95% of mental health professionals report that mental health concerns are growing on their campus" (Covington).

Given the widespread use of psychiatric medications among college students and the growing concerns about mental health on campuses, it is crucial to understand the potential interactions and effects of using multiple drugs concurrently. This project aims to provide users with a comprehensive AI-powered tool to do just that. Furthermore, this project plays a crucial role in reducing the stigma associated with medicated mental health challenges. By providing comprehensive education on how prescribed medications interact with other substances, it empowers students to make informed and responsible decisions regarding their social substance use without feeling ostracized by their peers.

While the collegiate application was the motivation behind the project as students ourselves, this tool is applicable far beyond the academic environment. This robust and versatile application can be used by anyone to compare and understand the interactions of various prescribed or over-the-counter medications, thereby promoting informed and safe medication practices for all.



This project utilizes the Food and Drug Administration's openFDA API in order to query for information about the inputted drugs. It then utilizes OpenAI's ChatGPT-3.5 turbo API with the results from openFDA in order to construct a specific, relevant input. This input combines the breadth of ChatGPT with the depth of openFDA, creating a well-rounded summary that is digestible to the reader while including the crucial drug information. We took advantage of the vast amounts of data that ChatGPT was trained on while ensuring that its summary would remain accuarate and concise, mitigating one of the biggest downsides of ChatGPT being giving outright incorrect or too generic of information.


References:

Covington, Taylor. “Mental Health Statistics in 2021 | the Zebra.” Www.thezebra.com, 22 Sept. 2021, www.thezebra.com/resources/research/mental-health-statistics/.

This project was made using OpenAI's chatgpt to help debug and streamline functionality. 



