var width=1350,
    height=600,
    length=20;
    nodes=[],
    mat=new Array(length),
    dij=[],
     final=[],path=[],
     count=0,
     start=0,end=0,ang=0,intensity=6;
var input1,input2, button;
function setup() {
  createCanvas(1350,600);
  background(255);
  for(i=0;i<length;i++)
     {mat[i]=new Array(length)}
          setInterval(sine,50)
          newmap()
          drawmap(150)
          console.log(mat)
          var st=15,en=7     
          input1=createInput();
          input1.position(20, 45);
          input2=createInput();
          input2.position(20, 75);
          button = createButton('Find Path');
          button.position(20, 105);
          button.mousePressed(roll);
}

function roll()
{
    var st=input1.value()
    console.log(typeof(st))
    var en=input2.value()
    console.log(typeof(en))
    if(st===""||en==="")
    {}
	
  else{
    background(255)
    s=parseInt(st)-1
    e=parseInt(en)-1
    console.log(s)
    console.log(e)
    if(s>=0&&s<=19&&e>=0&&e<=19)
    {
    drawmap(50)
    dijkstra(s,e)
    drawpath()
}
	else{
    input1.value("")
    input2.value("")
		alert("out of range")
	}
}
}

function newmap()
{
  nodes=[]
for(i=1;i<=length;i++)
     {
          
          fill(255,0,0);
          var x=Math.random()*width+130;
          var y=Math.random()*height;
          if(x+10>=width)
               {
                    diff=x-width
                    x=width-100
               }
          else if(x-10<=0)
               {
                    diff=x
                    x=100
               }
          if(y+10>=height)
               {
                    diff=y-height
                    y=height-40
               }
          else if(y-10<=0)
               {
                    diff=y
                    y=40
               }     
          
          var temp={node:i,
                    x:x,
                    y:y}
               nodes.push(temp)
          }
     console.log(nodes)
     for(i=0;i<length;i++)
     {
          for(j=0;j<length;j++)
          {
               mat[i][j]=0;
          }
     }
     for(i=0;i<length;i++)
          {
               var n1=nodes[i]
               for(j=0;j<length;j++)
               {
                    if(i===j)
                    {mat[i][j]=-1;}
                    else{
                         var n2=nodes[j];
                         var rand=(int)(Math.random()*10);
                         if(rand%4==0)
                         {
                              mat[i][j]=dist(n1.x,n1.y,n2.x,n2.y);
                              mat[j][i]=mat[i][j];
                              }
                         else{
                              mat[i][j]=-1;
                              mat[j][i]=-1;
                              }
                    }
               
                    }
          }
}

function dijkstra(start,end)
{
   dij=[]
   final=[]
   count=0
   var temp=new Array(mat.length)
   temp.fill(-1)
   dij.push(temp)
   console.log(dij)
   var node=start;
   console.log(node)
   dij[count][node]=0
   final.push(node)
   while(final[count]!==end)
   {
   var dist=dij[count][node]
   var temp2=[]
   for(i=0;i<mat.length;i++)
     {
          
          if(i===node)
               {temp2.push(dij[count][node])}
          else if(check(i)===1)
               {temp2.push(dij[count][i])}
          
          else
          {
               if(mat[node][i]===-1)
                    d=-1
               else
                    var d=mat[node][i]+dist
                    
               if(d===-1)
                    temp2.push(dij[count][i])
               else if((dij[count][i]===-1)||(d<=dij[count][i]))
                    temp2.push(d)
               else if(d>dij[count][i])
                    temp2.push(dij[count][i])
          }
     }
     node=minimum(temp2)
     final.push(node)
     console.log(final)
     count+=1
     dij.push(temp2)
     }
console.log(dij)
backtrack()
console.log(path)     
}

function backtrack()
{
     path=[]
     path.push(final[count]);
     var col=final[count]
     for(i=count-1;i>=0;i--)
     {
          if(dij[i][col]!==dij[i+1][col])
          {
               path.push(final[i])
               col=final[i]
          }
     }
     
}

function minimum(arr)
{
     var min=arr[0],pos=0,startpos=0;
     for(y=0;y<arr.length;y++)
          {
               if((check(y)===0)&&arr[y]!=-1)
                    {min=arr[y]
                     startpos=y
                     break;
                    }
          }
     for(x=startpos;x<arr.length;x++)
     { 
          if(arr[x]===-1)
          {}
          else if(min===-1)
          {min=arr[x]
           pos=x
          }
          else if(arr[x]<=min)
          { 
               if(check(x)===0){
                min=arr[x]
                pos=x }    
               }
     }console.log(pos)
     return pos;
}

function check(x)
{
   var flag=0;
               for(xx=0;xx<final.length;xx++){
                    if(x===final[xx])
                    {
                         flag=1;
                         break;
                    }
               }
               return flag;
}


function drawmap(alph)
{
  stroke(120,70)
  strokeWeight(3)

    for(i=0;i<length;i++)
          { fill(255,0,0,200)
            
            ellipse(nodes[i].x,nodes[i].y,20,20)
            stroke(255,255,0,180)
            fill(51)

          textSize(20);
          text(i+1,nodes[i].x,nodes[i].y);
               stroke(120,70)
            strokeWeight(3)

               for(j=0;j<length;j++){
                    if(mat[i][j]!==-1){
                         
                         line(nodes[i].x,nodes[i].y,nodes[j].x,nodes[j].y);
                         
                         }
               
               }
          }
}

function sine()
{
  ang+=5;
  if(ang>=361)
    {ang=0}
  intensity=20*Math.sin(ang*PI/180)
  background(51)
  drawmap(50)
  if(path.length!==0)
    drawpath()
}
function drawpath()
{
  //for(xx=0;xx<path.length-1;xx++)
    for(xx=path.length-2;xx>=0;xx--)
     {   var prevx=nodes[path[xx]].x
          var prevy=nodes[path[xx]].y
          /*for(z=1;z<=20;z++)
          {*/
            stroke(180,80)
            strokeWeight(3)
            fill(0,255,0)
            ellipse(nodes[path[xx]].x,nodes[path[xx]].y,20,20)
            stroke(200,150)
            strokeWeight(4)
          /*var m=z,n=20-z;
          var px=(nodes[path[xx]].x*n+nodes[path[xx+1]].x*m)/20
          var py=(nodes[path[xx]].y*n+nodes[path[xx+1]].y*m)/20*/

          line(nodes[path[xx]].x,nodes[path[xx]].y,nodes[path[xx+1]].x,nodes[path[xx+1]].y)
          //line(prevx,prevy,px,py)
          for(alph=0;alph<=10;alph++)
          {
            stroke(0,255,0,20+(alph*intensity))
            strokeWeight(15-(alph*2))
            //line(prevx,prevy,px,py)
            line(nodes[path[xx]].x,nodes[path[xx]].y,nodes[path[xx+1]].x,nodes[path[xx+1]].y)
          }
          
          /*prevx=px;
          prevy=py;
          //setTimeout(10000,function(){})
          }*/
          stroke(0,255,0,100)
        strokeWeight(5)
          fill(51)
          textSize(20);
          text(nodes[path[xx]].node,nodes[path[xx]].x,nodes[path[xx]].y);
     }
       stroke(180,80)
            strokeWeight(3)
            fill(0,255,0)
            ellipse(nodes[path[path.length-1]].x,nodes[path[path.length-1]].y,20,20)
        stroke(0,255,0,100)
        strokeWeight(5)
        fill(51)
          textSize(20);
          text(nodes[path[path.length-1]].node,nodes[path[path.length-1]].x,nodes[path[path.length-1]].y);
}


function draw() {
 
}