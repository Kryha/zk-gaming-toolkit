// The 'gamingTk.aleo' program.
program gamingTk.aleo;

record dice:
    owner as address.private;
    gates as u64.private;
    faceAmount as u32.private
    amount as u64.private;

function mint_dice:
    // dice address
    input r0 as address.private;
    // dice amount
    input r1 as u64.private;
    // password
    input r2 as field.private;

    // checks if the password is correct
    hash.psd2 r2 into r3;
    // it will continue running only is the password hashes match
    // the execution will fail otherwise.
    assert.eq r3 7202470996857839225873911078012225723419856133099120809866608931983814353616field;

    // create a new (6 face) dice in r2 register
    cast r0 0u64 6u32 r1 into r4 as dice.record;
    // return the new dice
    output r4 as dice.record;

// Get dice and return rolled value for each dice amount
function roll_dice:
    input r0 as dice.record;
    add 0u64 r0.amount into r2;
    // For range(dice.amount)
        // math.random(1,dice.faceAmount) into rN

    output r2 as u32.private;

function generateKey:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;

function generateProof:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;

function random:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;

// TODO: implement for all powerups
function powerup:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;

// Token Example
record token:
    owner as address.private;
    gates as u64.private;
    amount as u64.private;

function transfer_amount:
    //  sender token record
    input r0 as token.record;
    // receiver address
    input r1 as address.private;
    // amount to transfer
    input r2 as u64.private;

    // final balance of sender
    sub r0.amount r2 into r3;
    // final balance of receiver
    add 0u64 r2 into r4;

    // sender token record after the transfer
    cast r0.owner r0.gates r3 into r5 as token.record;
    // receiver token record after the transfer
    cast r1 0u64 r4 into r6 as token.record;

    // sender new token record
    output r5 as token.record;
    // receiver new token record
    output r6 as token.record;
