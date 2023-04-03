import { ethers } from "hardhat";
import {readAddressList } from "../scripts/helper";

async function v1() {

    //和v1 版本交互，调用的是proxy合约
    const addressList = readAddressList();
    const proxyAddress = addressList['proxy'];
    //链接合约
    const simpleProxy = await ethers.getContractAt("Simple", proxyAddress);

    // 查看常量
    console.log("当前常量age :", await simpleProxy.getAge())

    //查看当前的value 值
    console.log("当前值: ", await simpleProxy.getValue());

    //设置一个新的value值
    console.log("设置值为100: ", await simpleProxy.setValue(100));

    console.log("当前值: ", await simpleProxy.getValue());
}

async function v2() {

    //和v2 版本交互，调用的是proxy合约
    const addressList = readAddressList();
    const proxyAddress = addressList['proxy'];
    //链接合约
    const simpleProxyV2 = await ethers.getContractAt("SimpleV2", proxyAddress);

    // 查看常量
    console.log("当前常量age :", await simpleProxyV2.getAge())

    // 修改常量
    console.log("修改常量 :", await simpleProxyV2.setAge(20))

    // 查看常量
    console.log("当前常量age :", await simpleProxyV2.getAge())

    //v2 中新增了2个函数  add / sub
    //查看当前的value 值
    console.log("当前值: ", await simpleProxyV2.getValue());


    console.log("执行减1操作: ", await simpleProxyV2.addValue(10));

    //查看当前的value 值
    console.log("当前值: ", await simpleProxyV2.getValue());


    console.log("执行减1操作: ", await simpleProxyV2.subValue(20));

    //查看当前的value 值
    console.log("当前值: ", await simpleProxyV2.getValue());
}

async function main() {
    // v1();
    v2();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});