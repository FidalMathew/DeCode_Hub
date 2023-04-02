import smartpy as sp
FA2 = sp.io.import_template("FA2.py")


class NFT(FA2.FA2):
    pass


@sp.add_test(name="tests")
def test():
    goku = sp.test_account("Goku")
    naruto = sp.test_account("Naruto")
    admin = sp.address("tz1cHtGRewCVsbFybBtTy6EM8mvSCjdimxqK")
    scenario = sp.test_scenario()
    scenario.h1("NFT contract DECode_Hub")
    nft = NFT(FA2.FA2_config(non_fungible=True), admin=admin, metadata=sp.big_map({"": sp.utils.bytes_of_string(
        "tezos-storage:content"), "content": sp.utils.bytes_of_string("""{"name": "Attribute Contract", "description": "NFT contract for the tutorial"}""")}))
    scenario += nft
    nft.mint(token_id=0, address=goku.address, amount=1, metadata=sp.map({"": sp.utils.bytes_of_string(
        "ipfs://QmWUATm299bNoVS9MypxbVcgd68fKHgyLW95s1jNX5NQB9")})).run(sender=admin)
