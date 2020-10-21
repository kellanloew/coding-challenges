function ecgSequenceIndex (given){
	function getPrimeFactorsOfNum(num){
        let increment = 2;
        let primes = [];
        while(increment <= Math.floor(num / 2)){
        	
            if(checkIfNumIsPrime(increment) && num % increment == 0){
                primes.push(increment);
            }
            increment += 1;
        }
        if(primes.length == 0){
            primes.push(num);
        }
        return primes;
    }

    function checkIfNumIsPrime(num){
        let i = 2;
        while(i <= Math.floor(num / 2)){
            if(num % i == 0){
                return false;
            }
            i += 1;
        }
        return true;
    }
    
    function doNumsHaveCommonFactor(num1, num2){
        let primes1 = getPrimeFactorsOfNum(num1);
        let primes2 = getPrimeFactorsOfNum(num2);
        return primes1.some(item => primes2.includes(item)) 
    }

    let sequence = [1, 2];
    let listToRecheck = [];
    let i = 3;
    
    outerloop:
    while(true){
        
        //if the current iteration have a commn factor with the last number in the ECG sequence
        if(doNumsHaveCommonFactor(i, sequence[sequence.length - 1])){
            sequence.push(i);
            if(i == given) {break};
        }
        //if not, add this number to the "recheck" list
        else{
            listToRecheck.push(i);
        }

        reset = false;
        r = 0;
        //loop through all skipped values that should be rechecked
        while(r < listToRecheck.length){
           
            if(doNumsHaveCommonFactor(listToRecheck[r], sequence[sequence.length - 1])){
                sequence.push(listToRecheck[r]);
                if(listToRecheck[r] == given) break outerloop;
                listToRecheck.splice(r, 1);
                //reset recheck iterator to 0, since we added a new number to the sequence
                reset = true;
            }

            r ++;
            if(reset) {
                r = 0;
                reset = false;
            }
        }
        i ++;
    }

    return sequence.length - 1;
}

console.log(ecgSeqIndex(100));